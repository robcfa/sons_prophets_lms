import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  sizes = '(max-width: 600px) 400px, 800px',
  webpSrc = null,
  fallbackSrc = null,
  loading = 'lazy',
  priority = false,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // If priority is true, preload the image
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      if (webpSrc) {
        link.type = 'image/webp';
      }
      document.head.appendChild(link);
    }
  }, [priority, src, webpSrc]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  // Generate WebP and fallback sources
  const generateWebpSrc = (originalSrc) => {
    if (!originalSrc) return null;
    const extension = originalSrc.split('.').pop();
    return originalSrc.replace(`.${extension}`, '.webp');
  };

  const webpSource = webpSrc || generateWebpSrc(src);
  const fallback = fallbackSrc || src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse-gentle flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
        </div>
      )}

      {/* Error placeholder */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground"
          style={{ width, height }}
        >
          <div className="text-center">
            <svg 
              className="mx-auto h-12 w-12 text-muted-foreground/50" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="mt-2 text-sm">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Optimized image with WebP support */}
      <picture>
        {webpSource && (
          <source
            srcSet={webpSource}
            sizes={sizes}
            type="image/webp"
          />
        )}
        <img
          ref={imgRef}
          src={fallback}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          className={`
            transition-opacity duration-300 ease-in-out
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${hasError ? 'hidden' : 'block'}
          `}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </picture>
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  sizes: PropTypes.string,
  webpSrc: PropTypes.string,
  fallbackSrc: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  priority: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

export default OptimizedImage;