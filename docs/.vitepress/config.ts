import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    base: "/dsp/",
    description: "Small & fast disposables.",
    title: "dsp",
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
            {
                base: "/Dsp/",
                text: "Dsp",
                items: [
                    { link: "add", text: "add" },
                    { link: "create", text: "create" },
                    { link: "dispose", text: "dispose" },
                    { link: "find", text: "find" },
                    { link: "includes", text: "includes" },
                    { link: "isDisposed", text: "isDisposed" },
                    { link: "isDsp", text: "isDsp" },
                    { link: "remove", text: "remove" },
                    { link: "unlink", text: "unlink" },
                ],
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/dsp" },
        ],
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
