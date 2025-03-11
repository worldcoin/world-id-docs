import { useState } from 'react'

export const SageSupportLinkWizard = () => {

  const [devProjectId, setDevProjectId] = useState('');
  const [returnURI, setReturnURI] = useState('');

  const [error, setError] = useState('');

  const handleDevProjectIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDevProjectId(value);
    
    if (value && isNaN(Number(value))) {
      setError('Dev Project ID must be a number');
    } else {
      setError('');
    }
  };

  const handleReturnURIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReturnURI(value);
    
    if (value && !value.startsWith('https://worldcoin.org/mini-app')) {
      setError('Return URI must start with https://worldcoin.org/mini-app');
    } else {
      setError('');
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-md">

      {/* Settings */}
      <div className="mb-4 flex gap-4 flex-col sm:flex-row">
        <div className='w-full sm:w-1/4'>
          <label htmlFor="devProjectId" className="block text-sm font-medium mb-1">
            Sage Dev Project ID
          </label>
          <input
            id="devProjectId"
            type="text"
            placeholder="Sage Project ID"
            value={devProjectId}
            onChange={handleDevProjectIdChange}
            className="rounded-lg p-2 border-2 w-full"
          />
        </div>

        <div className='flex-1'>
          <label htmlFor="returnURI" className="block text-sm font-medium mb-1">
            Custom Return URI
          </label>
          <input
            id="returnURI"
            type="text"
            placeholder="Return URI"
            value={returnURI}
            onChange={handleReturnURIChange}
            className="rounded-lg p-2 border-2 w-full"
          />
        </div>
      </div>

      {/* Generated Link */}
      <label htmlFor="generatedLink" className={`block text-sm font-medium mb-1 ${error && 'text-red-600'}`}>
        Generated Link
      </label>
      <input
        id="generatedLink"
        type="text"
        placeholder="Generated Link"
        readOnly
        value={error ? error : `https://worldcoin.org/mini-app?app_id=app_5dee2f19cd6eef599eb6ab275a0a7523&path=/support-chat?${encodeURIComponent(`devProjectId=${devProjectId}${returnURI ? `&devReturnURI=${returnURI.replace(/&/g, '(amps)')}` : ''}`)}`}
        className={`rounded-lg p-2 border-2 w-full ${error && 'text-red-600 border-red-600'}`}
      />

      {/* Errors */}
      {/* <p className='text-red-600 mb-0'>Error: abcdef</p> */}
    </div >
  )
}