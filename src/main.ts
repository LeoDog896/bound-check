import './style.css'

const fileInput = document.querySelector<HTMLInputElement>('#file-input')!
const fileDisplay = document.querySelector('canvas')!
const textInput = document.querySelector<HTMLInputElement>('#text-input')!

const ctx = fileDisplay.getContext('2d')!

// when file input changes, display the image on the canvas (resize canvas if needed)
fileInput.addEventListener('change', () => {
  const file = fileInput.files![0]
  const reader = new FileReader()
  reader.onload = () => {
    const img = new Image()
    img.onload = () => {
      fileDisplay.width = img.width
      fileDisplay.height = img.height
      ctx.drawImage(img, 0, 0)
    }
    img.src = reader.result as string
  }
  reader.readAsDataURL(file)
});

textInput.addEventListener('input', () => {
  // change from percentage to pixels
  const [x, y, width, height] = textInput.value.split(' ').map(Number).map((num, i) => {
    num = i > 1 ? num : (1 - num)
    if (i % 2 === 0) {
      return num * fileDisplay.width
    } else {
      return num * fileDisplay.height
    }
  });

  console.log(x, y, width, height)

  // draw a rectangle on the canvas
  ctx.beginPath()
  ctx.rect(x, y, width, height)
  ctx.lineWidth = 5
  ctx.strokeStyle = 'red'
  ctx.stroke()
})