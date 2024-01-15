import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  useEffect(() => {
    const pathNames = location.pathname.split('/').filter((name) => name !== '');
    setCurrentPath(pathNames);
  }, [location.pathname]);

  return (
    <Breadcrumb>
      {currentPath.map((path, index) => (
        <Breadcrumb.Item  key={index} linkAs={Link} linkProps=  {{ to: `/${currentPath.slice(0, index + 1).join('/')}` }} >
          {path}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};


export default Breadcrumbs;