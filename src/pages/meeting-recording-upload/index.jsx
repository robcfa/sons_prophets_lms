import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Button from '../../components/ui/Button';

const RecordingUploadPage = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('recording', file);
    try {
      const response = await fetch(`http://localhost:4000/meetings/${id}/recording`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.url) {
        setUploadUrl(data.url);
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Upload Recording - Sons Prophets LMS</title>
      </Helmet>
      <GlobalHeader />
      <PrimaryNavigation />
      <BreadcrumbTrail />
      <main className="max-w-3xl mx-auto py-6 space-y-6">
        <h1 className="text-2xl font-heading font-heading-semibold text-text-primary">
          Upload Meeting Recording
        </h1>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            accept="video/*,audio/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-text-primary"
          />
          <Button type="submit" variant="primary" size="sm" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>
        {uploadUrl && (
          <p className="text-sm text-text-secondary">
            Recording uploaded: <a href={uploadUrl}>{uploadUrl}</a>
          </p>
        )}
      </main>
    </div>
  );
};

export default RecordingUploadPage;
