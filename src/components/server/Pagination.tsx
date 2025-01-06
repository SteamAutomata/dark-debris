function Link(n: number, label?: string) {
  return <a href={`/pokemons?p=${n}`}>{label ?? n}</a>;
}

const RANGE = 2;

export default function ({
  currentPage,
  pages,
}: {
  currentPage: number;
  pages: number;
}) {
  const result = [];

  // Left hand
  if (currentPage > 0) {
    result.push(Link(currentPage - 1, "Previous"));
  }
  result.push(Link(1));
  if (currentPage > RANGE * 2) {
    result.push(<span>...</span>);
  }

  // Middle
  for (
    let i = Math.max(2, currentPage - RANGE);
    i <= Math.min(pages - 1, currentPage + RANGE);
    i++
  ) {
    result.push(
      <span
        key={i}
        style={{ fontWeight: i === currentPage ? "bold" : "normal" }}
      >
        {Link(i)}
      </span>
    );
  }

  // Right hand
  if (currentPage < pages - 3) {
    result.push(<span>...</span>);
  }
  result.push(Link(pages));
  if (currentPage < pages) {
    result.push(Link(currentPage + 1, "Next"));
  }

  return <div style={{ display: "flex", gap: "8px" }}>{result}</div>;
}
