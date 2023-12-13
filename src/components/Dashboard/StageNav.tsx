import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';
type Props = {
  docsId?: number;
}
function StageNav({docsId}: Props) {
  const router = usePathname()
  console.log('Route: ', router)
  return (
    <nav className="flex px-5 py-3 mt-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center ">
      <Link 
      href={(docsId !== undefined)?`/dashboard/cyboks/info/${docsId}/stage1`
      :'/dashboard/dpo/documents/stage1'
      } 
      className={router.includes('stage1')
      ?"inline-flex items-center text-sm text-blue-400 font-bold hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
      :'ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white'
      }>
        1️⃣
        stage1
      </Link>
    </li>
    <li>
      <div className="flex items-center">
        <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>2️⃣
        <Link href={(docsId !== undefined)?`/dashboard/cyboks/info/${docsId}/stage2`:'/dashboard/dpo/documents/stage2'} 
        className={router.includes('stage2')
      ?"inline-flex items-center text-sm text-blue-400 font-bold hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
      :'ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white'
      }>Stage2</Link>
      </div>
    </li>
    <li aria-current="page">
      <div className="flex items-center">
        <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>3️⃣
        <Link href={(docsId !== undefined)?`/dashboard/cyboks/info/${docsId}/stage3`:'/dashboard/dpo/documents/stage3'}  
        className={router.includes('stage3')
        ?"inline-flex items-center text-sm text-blue-400 font-bold hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
        :'ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white'
        }>Stage3</Link>
      </div>
    </li>
  </ol>
</nav>
  )
}

export default StageNav