"use client"
import { getFiles } from '@/actions';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' }
];

interface FileData {
  name: string;
  descr: string;
  email: string;
  url: string;
}

export default function Page() {
  const [data, setData] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getFiles()
      .then((res) => {
        if (!res.success) {
          setError('Failed to fetch data');
        } else {
          setData(res.body);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError('An error occurred while fetching data');
        setIsLoading(false);
      });
  }, []);

  const handleAnalyze = async (file: string | FileData | Blob) => {
    const formData = new FormData();
    const blobFile = new Blob([JSON.stringify(file)], { type: 'application/json' });
    formData.append('docs', blobFile);

    try {
      const response = await fetch(' http://127.0.0.1:8000//llm/process', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        router.push(`/dashboard/analyze?insights=${encodeURIComponent(JSON.stringify(result.insights))}&references=${encodeURIComponent(result.references)}`);
      } else {
        console.error('Error processing file:', result.error);
      }
    } catch (error) {
      console.error('Error analyzing file:', error);
    }
  };

  return (
    <div className="flex flex-col overflow-y-auto scrollbar-hide h-screen p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Files</h1>
        <Link href="/dashboard/project/new">
          <Button>Add Project</Button>
        </Link>
      </div>

      {isLoading && <p className="text-gray-500">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {data.map((file, index) => (
              <div key={index} className="bg-black dark:bg-white/10 shadow-md rounded-lg p-4">
                <Image className="mx-auto" height={200} width={200} src="/folder.png" alt="icon" />
                <h2 className="text-xl font-semibold mb-2">Title: {file.name}</h2>
                <p className="text-gray-600 mb-2">Description: {file.descr}</p>
                <p className="text-blue-500 mb-2">Email: {file.email}</p>

                <div className="flex gap-3">
                  <Button className="w-full">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black-500 hover:underline"
                    >
                      View File
                    </a>
                  </Button>
                  <Button className="w-full" onClick={() => handleAnalyze(file)}>
                    Analyze
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
