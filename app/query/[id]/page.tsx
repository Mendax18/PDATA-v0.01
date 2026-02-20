"use client"

import { FlipsideQueryViewer } from "@/components/flipside-query-viewer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function QueryPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-orange-400">Flipside Query Results</h1>
      </div>

      <FlipsideQueryViewer queryId={params.id} />
    </div>
  )
}
