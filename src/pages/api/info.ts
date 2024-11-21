import { version } from 'package.json'

export default (_, res) => {
  res.status(200).json({ version, environment: process.env.CUSTOM_ENV, about: 'dev by SAM team' })
}
