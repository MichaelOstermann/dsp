const D = Symbol("DISPOSED")

export interface Dsp {
    [D]: boolean
    dsps: DspLink | undefined
    vals: DspLink | undefined
}

export interface DspLink {
    disposer: Dsp
    nextDsp: DspLink | undefined
    nextVal: DspLink | undefined
    prevDsp: DspLink | undefined
    prevVal: DspLink | undefined
    val: (() => void) | Dsp
}

export function dspCreate(): Dsp {
    return {
        [D]: false,
        dsps: undefined,
        vals: undefined,
    }
}

type DisposeStack =
    | undefined
    | { dsp: Dsp, prev: DisposeStack }

export function dspIs(value: unknown): value is Dsp {
    return value != null && typeof value === "object" && D in value
}

export function dspDisposed(disposer: Dsp): boolean {
    return disposer[D]
}

export function dspLink(disposer: Dsp, value: (() => void) | Dsp): DspLink | undefined
export function dspLink(a: Dsp, b: (() => void) | Dsp): DspLink | void {
    if (D in b) {
        if (a === b) return
        if (b[D]) return
        if (a[D]) return dspDispose(b)
        return linkDsp(b, linkVal(a, createLink(a, b)))
    }

    if (a[D]) return b()
    return linkVal(a, createLink(a, b))
}

export function dspUnlink(link: DspLink | undefined): void {
    if (!link) return
    unlinkVal(link)
    unlinkDsp(link)
}

export function dspFind(disposer: Dsp, value: (() => void) | Dsp): DspLink | undefined {
    let link = disposer.vals
    while (link) {
        if (link.val === value) return link
        link = link.prevVal
    }
    return link
}

export function dspIncludes(disposer: Dsp, value: (() => void) | Dsp): boolean {
    return !!dspFind(disposer, value)
}

export function dspRemove(disposer: Dsp, value: (() => void) | Dsp): void {
    return dspUnlink(dspFind(disposer, value))
}

export function dspDispose(disposer: Dsp): void {
    let errors: unknown[] | undefined
    let stack: DisposeStack = { dsp: disposer, prev: undefined }
    let dsp: Dsp | undefined = disposer

    while (dsp) {
        dsp[D] = true

        while (dsp.dsps) {
            unlinkVal(dsp.dsps)
            dsp.dsps = dsp.dsps.prevDsp
        }

        while (dsp.vals) {
            const val: Dsp | (() => void) = dsp.vals.val
            dsp.vals = dsp.vals.prevVal
            if (D in val) {
                stack = { dsp: val, prev: stack }
                dsp = val
            }
            else {
                try {
                    val()
                }
                catch (err) {
                    errors ??= []
                    errors.push(err)
                }
            }
        }

        stack = stack?.prev
        dsp = stack?.dsp
    }

    if (!errors) return
    if (errors.length === 1) throw errors[0]
    throw new AggregateError(errors, "DisposeError")
}

function createLink(disposer: Dsp, val: (() => void) | Dsp): DspLink {
    return {
        disposer,
        nextDsp: undefined,
        nextVal: undefined,
        prevDsp: undefined,
        prevVal: undefined,
        val,
    }
}

function linkVal(disposer: Dsp, link: DspLink): DspLink {
    link.prevVal = disposer.vals
    if (disposer.vals) disposer.vals.nextVal = link
    disposer.vals = link
    return link
}

function linkDsp(disposer: Dsp, link: DspLink): DspLink {
    link.prevDsp = disposer.dsps
    if (disposer.dsps) disposer.dsps.nextDsp = link
    disposer.dsps = link
    return link
}

function unlinkVal(link: DspLink): void {
    if (link.prevVal) link.prevVal.nextVal = link.nextVal
    if (link.nextVal) link.nextVal.prevVal = link.prevVal
    if (link.disposer.vals === link) link.disposer.vals = link.prevVal
    link.nextVal = link.prevVal = undefined
}

function unlinkDsp(link: DspLink): void {
    if (D in link.val) {
        if (link.prevDsp) link.prevDsp.nextDsp = link.nextDsp
        if (link.nextDsp) link.nextDsp.prevDsp = link.prevDsp
        if (link.val.dsps === link) link.val.dsps = link.prevDsp
        link.nextDsp = link.prevDsp = undefined
    }
}
