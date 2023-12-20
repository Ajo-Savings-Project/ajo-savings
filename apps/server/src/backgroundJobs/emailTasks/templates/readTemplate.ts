import fs from 'fs'

export const readTemplate = async (name: string) => {
  try {
    return fs.readFileSync(require.resolve(`../templates/${name}.html`), {
      encoding: 'utf-8',
    })
  } catch (error) {
    throw new Error('Error reading template file: ' + error)
  }
}
