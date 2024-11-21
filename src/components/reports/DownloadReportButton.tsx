import DownloadIcon from '@mui/icons-material/Download'
import { CircularProgress } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

interface DownloadReportButtonProps {
  year: string
  month: string
  onDownloadClick?: (period: string) => void
  isDownloaded?: boolean
}

export function DownloadReportButton(props: DownloadReportButtonProps) {
  const { year, month, isDownloaded, onDownloadClick } = props
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isDownloaded) {
      setIsLoading(false)
    }
  }, [isDownloaded])

  const handleClick = async () => {
    if (onDownloadClick == undefined || isLoading) {
      return
    }
    setIsLoading(true)
    onDownloadClick(`${year}-${month.toString().padStart(2, '0')}`)
  }

  return (
    <GridActionsCellItem
      label="Download"
      onClick={handleClick}
      color="secondary"
      icon={isLoading ? <CircularProgress size={24} color="secondary" /> : <DownloadIcon />}
    />
  )
}
