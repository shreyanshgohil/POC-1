const el = document.querySelector('.hello')!;
el.addEventListener('click', (event): void => {
  console.log(event.target as HTMLInputElement).value;
});
