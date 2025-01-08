export default function PokemonIcon(props: any) {
  function handleClick() {
    new Audio(props.soundUrl).play();
  }

  return <img {...props} onClick={handleClick} />;
}
