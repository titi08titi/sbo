import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SaveIcon from '@mui/icons-material/Save'
import { IconButton, Stack, Tooltip, Typography } from '@mui/material'

import { DownloadToolbar, UploadFileButton } from '#components/common'

type PlasticTaxTableToolbarProps = {
  onUpload?: (files: FileList | null) => void
  onSave?: () => void
  disableSave?: boolean
}

const csvData = [['stockCode'], ['STO198111'], ['STO207742']]

export default function PlasticTaxTableToolbar(props: PlasticTaxTableToolbarProps) {
  const { onUpload, onSave, disableSave } = props
  return (
    <Stack direction="row" spacing={2}>
      <DownloadToolbar
        dataSet={csvData}
        title="Download template"
        label="Download template"
        filename="template-stock-code"
        isTemplace={true}
      />
      <UploadFileButton
        accept=".csv"
        onUpload={function (files: FileList): void {
          onUpload?.(files)
        }}
      >
        <Tooltip title="Upload csv file">
          <IconButton color="secondary" aria-label="upload file" component="span">
            <AddCircleOutlineIcon sx={{ color: 'secondary' }} />
            <Typography variant="body2" sx={{ color: 'secondary', paddingLeft: 1 }}>
              Upload
            </Typography>
          </IconButton>
        </Tooltip>
      </UploadFileButton>
      <Tooltip title="Save stock codes">
        <IconButton disabled={disableSave} color="secondary" aria-label="save" component="span" onClick={onSave}>
          <SaveIcon sx={{ color: 'secondary' }} />
          <Typography variant="body2" sx={{ color: 'secondary', paddingLeft: 1 }}>
            Save
          </Typography>
        </IconButton>
      </Tooltip>
    </Stack>
  )
}
