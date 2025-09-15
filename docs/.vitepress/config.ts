import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    base: "/disposables/",
    description: "Small & fast disposables.",
    title: "disposables",
    markdown: {
        theme: {
            dark: "catppuccin-macchiato",
            light: "github-light-default",
        },
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    themeConfig: {
        aside: false,
        outline: "deep",
        docFooter: {
            next: false,
            prev: false,
        },
        search: {
            provider: "local",
        },
        sidebar: [
            { link: "dspCreate", text: "dspCreate" },
            { link: "dspIs", text: "dspIs" },
            { link: "dspDisposed", text: "dspDisposed" },
            { link: "dspLink", text: "dspLink" },
            { link: "dspUnlink", text: "dspUnlink" },
            { link: "dspDispose", text: "dspDispose" },
            { link: "dspIncludes", text: "dspIncludes" },
            { link: "dspRemove", text: "dspRemove" },
            { link: "dspFind", text: "dspFind" },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/disposables" },
        ],
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
