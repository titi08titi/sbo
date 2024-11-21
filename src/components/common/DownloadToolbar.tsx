import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { IconButton, Stack, Tooltip, Typography } from '@mui/material'

import { CSVLink } from 'react-csv'

type DownloadToolbarProps = {
  dataSet: object[]
  title?: string
  label?: string
  filename: string
  isTemplace?: boolean
}

export default function DownloadToolbar(props: DownloadToolbarProps) {
  const { dataSet, filename, title, label, isTemplace } = props
  return (
    <Stack direction="row" spacing={2}>
      <Tooltip title={title ?? 'Export datas to CSV'}>
        <IconButton color="secondary" aria-label="download" component="span">
          {isTemplace === true ? <ContentCopyIcon /> : <FileDownloadIcon />}
          <Typography variant="body2" sx={{ color: 'secondary', paddingLeft: 1 }}>
            <CSVLink data={dataSet} enclosingCharacter={``} separator={';'} filename={filename + '.csv'}>
              {label ?? 'Download'}
            </CSVLink>
          </Typography>
        </IconButton>
      </Tooltip>
    </Stack>
  )
}
