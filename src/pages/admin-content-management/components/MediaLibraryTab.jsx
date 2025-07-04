import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MediaLibraryTab = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [uploadProgress, setUploadProgress] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    // Mock media files data
    const mockFiles = [
      {
        id: 'file-1',
        name: 'introduction-video.mp4',
        type: 'video',
        size: 45678901,
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
        uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        usageCount: 12,
        tags: ['introduction', 'video', 'course'],
        duration: '5:23',
        resolution: '1280x720'
      },
      {
        id: 'file-2',
        name: 'old-testament-map.jpg',
        type: 'image',
        size: 2345678,
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
        uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        usageCount: 8,
        tags: ['map', 'geography', 'reference'],
        dimensions: '1920x1080'
      },
      {
        id: 'file-3',
        name: 'prophecy-timeline.pdf',
        type: 'document',
        size: 1234567,
        url: '/assets/documents/prophecy-timeline.pdf',
        thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=300&h=200&fit=crop',
        uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        usageCount: 15,
        tags: ['timeline', 'reference', 'study-guide'],
        pages: 12
      },
      {
        id: 'file-4',
        name: 'hebrew-pronunciation.mp3',
        type: 'audio',
        size: 5678901,
        url: '/assets/audio/hebrew-pronunciation.mp3',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
        uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        usageCount: 6,
        tags: ['hebrew', 'pronunciation', 'audio'],
        duration: '12:45'
      }
    ];
    setMediaFiles(mockFiles);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const fileId = `upload-${Date.now()}-${Math.random()}`;
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            // Add file to media library
            const newFile = {
              id: fileId,
              name: file.name,
              type: file.type.startsWith('image/') ? 'image' : 
                    file.type.startsWith('video/') ? 'video' :
                    file.type.startsWith('audio/') ? 'audio' : 'document',
              size: file.size,
              url: URL.createObjectURL(file),
              thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : 
                        'https://images.unsplash.com/photo-1568667256549-094345857637?w=300&h=200&fit=crop',
              uploadDate: new Date(),
              usageCount: 0,
              tags: []
            };
            setMediaFiles(prev => [newFile, ...prev]);
            return { ...prev, [fileId]: undefined };
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.ogg'],
      'audio/*': ['.mp3', '.wav', '.ogg'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 100 * 1024 * 1024 // 100MB
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    const icons = {
      image: 'Image',
      video: 'Video',
      audio: 'Music',
      document: 'FileText'
    };
    return icons[type] || 'File';
  };

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleBulkDelete = () => {
    setMediaFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const FileCard = ({ file }) => (
    <div className="bg-card border border-subtle rounded-lg overflow-hidden hover:shadow-soft-md transition-all group">
      <div className="relative">
        <div className="aspect-video bg-surface overflow-hidden">
          <img
            src={file.thumbnail}
            alt={file.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/assets/images/no_image.png';
            }}
          />
        </div>
        
        {/* File Type Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-black bg-opacity-75 text-white px-2 py-1 text-xs rounded-full flex items-center gap-1">
            <Icon name={getFileIcon(file.type)} size={12} />
            {file.type.toUpperCase()}
          </span>
        </div>

        {/* Selection Checkbox */}
        <div className="absolute top-2 right-2">
          <input
            type="checkbox"
            checked={selectedFiles.includes(file.id)}
            onChange={() => handleFileSelect(file.id)}
            className="w-4 h-4 text-primary border-white rounded focus:ring-primary bg-white bg-opacity-75"
          />
        </div>

        {/* Upload Progress */}
        {uploadProgress[file.id] !== undefined && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm">{uploadProgress[file.id]}%</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-body font-body-semibold text-text-primary text-sm mb-1 truncate">
          {file.name}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
          <span>{formatFileSize(file.size)}</span>
          <span>{file.uploadDate.toLocaleDateString()}</span>
        </div>

        {/* File Details */}
        <div className="text-xs text-text-secondary mb-2">
          {file.duration && <span>Duration: {file.duration}</span>}
          {file.dimensions && <span>Size: {file.dimensions}</span>}
          {file.pages && <span>Pages: {file.pages}</span>}
        </div>

        {/* Usage Count */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">
            Used {file.usageCount} times
          </span>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="p-1">
              <Icon name="Eye" size={14} />
            </Button>
            <Button variant="ghost" size="sm" className="p-1">
              <Icon name="Download" size={14} />
            </Button>
            <Button variant="ghost" size="sm" className="p-1">
              <Icon name="Trash2" size={14} />
            </Button>
          </div>
        </div>

        {/* Tags */}
        {file.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {file.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-accent-100 text-accent-700 px-2 py-1 text-xs rounded-full">
                {tag}
              </span>
            ))}
            {file.tags.length > 3 && (
              <span className="text-xs text-text-secondary">+{file.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const FileRow = ({ file }) => (
    <div className="bg-card border border-subtle rounded-lg p-4 hover:shadow-soft-sm transition-all">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={selectedFiles.includes(file.id)}
          onChange={() => handleFileSelect(file.id)}
          className="w-4 h-4 text-primary border-subtle rounded focus:ring-primary"
        />
        
        <div className="w-12 h-12 bg-surface rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={file.thumbnail}
            alt={file.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/assets/images/no_image.png';
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-body font-body-semibold text-text-primary mb-1 truncate">
            {file.name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <Icon name={getFileIcon(file.type)} size={14} />
              {file.type.toUpperCase()}
            </span>
            <span>{formatFileSize(file.size)}</span>
            <span>Used {file.usageCount} times</span>
            <span>{file.uploadDate.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Icon name="Eye" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              type="text"
              placeholder="Search media files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="document">Documents</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex border border-subtle rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
          
          <Button variant="primary" iconName="Upload" onClick={() => setShowUploadModal(true)}>
            Upload Files
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedFiles.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-body text-primary-700">
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Download
              </Button>
              <Button variant="ghost" size="sm">
                Add Tags
              </Button>
              <Button variant="ghost" size="sm" onClick={handleBulkDelete}>
                Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedFiles([])}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragActive 
            ? 'border-primary bg-primary-50' :'border-subtle hover:border-primary hover:bg-surface'
        }`}
      >
        <input {...getInputProps()} />
        <Icon name="Upload" size={48} className="text-text-muted mx-auto mb-4" />
        <h3 className="font-heading font-heading-semibold text-text-primary mb-2">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </h3>
        <p className="text-text-secondary mb-4">
          or click to browse files
        </p>
        <p className="text-sm text-text-muted">
          Supports: Images, Videos, Audio, PDF, DOC (Max 100MB per file)
        </p>
      </div>

      {/* Files Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFiles.map((file) => (
            <FileRow key={file.id} file={file} />
          ))}
        </div>
      )}

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="font-heading font-heading-semibold text-text-primary mb-2">
            No files found
          </h3>
          <p className="text-text-secondary mb-4">
            {searchTerm || filterType !== 'all' ?'Try adjusting your search or filter criteria.' :'Upload your first media file to get started.'
            }
          </p>
          <Button variant="primary" iconName="Upload">
            Upload Files
          </Button>
        </div>
      )}
    </div>
  );
};

export default MediaLibraryTab;