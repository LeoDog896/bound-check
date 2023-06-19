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