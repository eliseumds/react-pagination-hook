import React from 'react';
import ReactDOM from 'react-dom';
import { usePagination } from './react-pagination-hook';

const SOURCE_DEMO = `
const pagination = usePagination({
  initialPage: %INITIAL_PAGE%,
  numberOfPages: %NUMBER_OF_PAGES%,
  maxButtons: %MAX_BUTTONS%,
});

// render however you like
`.trim();

function Demo() {
  const [initialPage, setInitialPage] = React.useState(1);
  const [numberOfPages, setNumberOfPages] = React.useState(10);
  const [maxButtons, setMaxButtons] = React.useState(5);

  React.useEffect(() => {
    if (initialPage > numberOfPages) {
      setInitialPage(numberOfPages);
    }
  }, [initialPage, numberOfPages]);

  React.useEffect(() => {
    if (maxButtons > numberOfPages) {
      setMaxButtons(numberOfPages);
    }
  }, [maxButtons, numberOfPages]);

  const {
    activePage,
    visiblePieces,
    goToPage,
  } = usePagination({ initialPage, numberOfPages, maxButtons });

  return (
    <div className="container">
      <h1>react-pagination-hook demo</h1>
      <div className="row">
        <div className="col-md-2">Initial page:</div>
        <div>
          <input type="range" value={initialPage} min={1} max={numberOfPages} onChange={event => setInitialPage(Number(event.target.value))} />
          {initialPage}
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">Number of pages:</div>
        <div>
          <input type="range" value={numberOfPages} min={1} max={100} onChange={event => setNumberOfPages(Number(event.target.value))} />
          {numberOfPages}
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">Max buttons:</div>
        <div>
          <input type="range" value={maxButtons} min={1} max={10} onChange={event => setMaxButtons(Number(event.target.value))} />
          {maxButtons}
        </div>
      </div>
      <pre>
        <code>
          {SOURCE_DEMO
            .replace('%INITIAL_PAGE%', String(initialPage))
            .replace('%NUMBER_OF_PAGES%', String(numberOfPages))
            .replace('%MAX_BUTTONS%', String(maxButtons))}
        </code>
      </pre>
      <div style={{ display: 'flex' }}>
        {visiblePieces.map((visiblePiece, index) => {
          const key = `${visiblePiece.type}-${index}`;

          if (visiblePiece.type === 'ellipsis') {
            return <div key={key} style={{ lineHeight: '48px' }}>...</div>;
          }

          const { pageNumber } = visiblePiece;
          const onClick = () => goToPage(pageNumber);

          if (visiblePiece.type === 'page-number') {
            const isActive = pageNumber === activePage;
            const className = isActive ? 'primary' : '';

            return <button key={key} onClick={onClick} className={className}>{pageNumber}</button>;
          }

          return <button key={key} disabled={visiblePiece.isDisabled} onClick={onClick}>
            {visiblePiece.type === 'next' ? '>' : '<'}
          </button>;
        })}
      </div>

      <hr />

      <p style={{ textAlign: 'right' }}>
        <a href="https://github.com/eliseumds/react-pagination-hook/tree/master/src/demo.tsx" target="_blank">Click here</a> to see the code for this demo
      </p>
    </div>
  );
}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo-container')
)
