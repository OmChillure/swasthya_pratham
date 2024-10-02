"use client"
import { useSearchParams } from 'next/navigation';

export default function AnalyzePage() {
  const searchParams = useSearchParams();
  const insights = searchParams.get('insights');
  const references = searchParams.get('references');

  const parsedInsights = insights ? JSON.parse(insights) : null;

  return (
    <div className="p-8 max-h-screen">
      <h1 className="text-2xl font-bold mb-4">Analysis Results</h1>
      {parsedInsights ? (
        <div>
          <h2 className="text-xl font-semibold">Overall Insight</h2>
          <p>{parsedInsights['Overall Insight']}</p>
          <h2 className="text-xl font-semibold mt-4">References</h2>
          <pre className="whitespace-pre-wrap">{references}</pre>
        </div>
      ) : (
        <p>No insights available.</p>
      )}
    </div>
  );
}
