import React, { useEffect } from 'react'
import styled from "styled-components"

const Container = styled.div`
  .grid__item { opacity: 0; }

  &.g .grid__item { opacity: 0.3; }
`;

export default function Grid() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'g') document.querySelector('.grid')?.classList.toggle('g')
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <Container className="grid fixed top-0 left-0 z-50 w-full h-full pointer-events-none">
      <div className="grid__item transition-opacity duration-500">
        <div className="grid grid-cols-24 gap-x-2.5 h-full">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="col-span-1">
              <div className="grid__item h-full bg-red-500"></div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
