import { toMatchImageSnapshot } from 'jest-image-snapshot'
import * as puppeteer from 'puppeteer'
import * as fs from 'fs'
import * as path from 'path'

expect.extend({ toMatchImageSnapshot })

const rootUrl = 'http://localhost:6060/#!/'
const rootDir = './src/components/'

function delay(t: number) {
    return new Promise((resolve: any) => {
        setTimeout(resolve, t)
    })
}

describe('Components tests', () => {
    jest.setTimeout(30000)

    let browser: puppeteer.Browser
    let page: puppeteer.Page
    const isDirectory = (name: string) => fs.lstatSync(name).isDirectory()
    const isComponent = (name: string) =>
        isDirectory(name)
        && (/^[A-Z]/).test(path.basename(name))
        && fs.existsSync(`${name}/index.ts`)

    const components: Array<{ title: string, url: string }> =
        fs.readdirSync(rootDir)
            .map(name => `${rootDir}${name}`)
            .filter(isComponent)
            .map(name => ({
                title: path.basename(name),
                url: `${rootUrl}${path.basename(name)}`
            }))

    beforeAll(async (done) => {
        const width = 1960
        const height = 960
        browser = await puppeteer.launch({
            headless: true,
            args: [
                `--window-size=${width},${height}`
            ],
        })
        page = await browser.newPage()
        await page.setViewport({ width, height })
        await page.goto(`${rootUrl}Components`, { "waitUntil": "networkidle0" })

        done()
    })

    components.forEach(
        (component: { title: string, url: string }) =>
            it(
                `${component.title} renders correctly`,
                async (done) => {
                    await page.goto(component.url, { "waitUntil": "networkidle0" })
                    await delay(1500)
                    const image = await page.screenshot({ fullPage: true })
                    expect(image).toMatchImageSnapshot()
                    done()
                }
            )
    )

    afterAll(async (done) => {
        await browser.close()
        done()
    })
})
