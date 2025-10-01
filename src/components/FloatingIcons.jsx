import React, { useEffect, useState } from 'react';
import './FloatingIcons.css';

const iconPaths = {
  'Sql.png': '/photos/Sql.png',
  'Angular.png': '/photos/Angular.png',
  'Api.png': '/photos/Api.png',
  'docker.png': '/photos/docker.png',
  'Figma.png': '/photos/Figma.png',
  'Git.png': '/photos/Git.png',
  'React.png': '/photos/React.png',
  'spring.png': '/photos/spring.png'
};

const allIcons = Object.keys(iconPaths);

function getRandomIcons(count = 5, exclude = []) {
  const available = allIcons.filter((icon) => !exclude.includes(icon));
  const selected = [];
  while (selected.length < count && available.length) {
    const idx = Math.floor(Math.random() * available.length);
    selected.push(available.splice(idx, 1)[0]);
  }
  return selected;
}

export default function FloatingIcons() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    function generate() {
      const icons = getRandomIcons(5);
      const styled = icons.map((icon) => ({
        icon,
        style: {
          left: `${Math.random() * 100}%`,
          top: `-${Math.random() * 150}px`,
          animationDuration: `${5 + Math.random() * 5}s`,   // Faster
          animationDelay: `${Math.random() * 2}s`,
          opacity: 0.2 + Math.random() * 0.2,
          width: '60px',
          height: '60px'
        }
      }));
      setItems(styled);
    }

    generate();
    const interval = setInterval(generate, 5000); // Update every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-icons">
      {items.map(({ icon, style }, i) => (
        <img
          key={icon + i}
          src={iconPaths[icon]}
          alt={icon.replace('.png', '')}
          className="floating-icon"
          style={style}
        />
      ))}
    </div>
  );
}
