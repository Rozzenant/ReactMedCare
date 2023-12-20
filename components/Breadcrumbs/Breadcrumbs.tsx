import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  useEffect(() => {
    const pathNames = location.pathname.split('/').filter((name) => name !== '');
    setCurrentPath(pathNames);
  }, [location.pathname]);

  if (currentPath.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>medical_care</Breadcrumb.Item>
      {currentPath.map((path, index) => (
        <Breadcrumb.Item key={path} linkAs={Link} linkProps={{ to: `/${currentPath.slice(0, index + 1).join('/')}` }}>
          {path}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
