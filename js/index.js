// Llamada a la generación por defecto con la url actual
gen()

// Llamada al cambio del código qr en tiempo real
changeQRCode()

// Función que cambia el código qr en tiempo real
function changeQRCode() {
    // Elementos
    var url = document.querySelector('#url')
    var logoInput = document.querySelector('#arc')
    var colorPicker = document.querySelector('#colorPicker')
    var colorPickerRing = document.querySelector('#colorPickerRing')
    var colorPickerRingCenter = document.querySelector('#colorPickerRingCenter')
    var colorPickerBg = document.querySelector('#backgroundPicker')
    var removeImg = document.querySelector('#removeImg')

    url.addEventListener('input', function () {
        gen()
    })

    logoInput.addEventListener('change', function () {
        var logoInput = document.querySelector('#logo');
        gen()
    })


    colorPicker.addEventListener('input', function () {
        gen()
    })

    colorPickerRing.addEventListener('input', function () {
        gen()
    })

    colorPickerRingCenter.addEventListener('input', function () {
        gen()
    })

    colorPickerBg.addEventListener('input', function () {
        gen()
    })

    var generar = document.querySelector('#generarBt')
    generar.addEventListener('click', function () {
        gen()
    })

    removeImg.addEventListener('click', function () {
        logoInput.value = null
        gen()
    })
}

// Función que genera el código qr
function gen() {
    // Elementos
    var config = document.querySelector('#config')
    var url = document.querySelector('#url')
    var logoInput = document.querySelector('#arc')
    var colorPicker = document.querySelector('#colorPicker')
    var colorPickerRing = document.querySelector('#colorPickerRing')
    var colorPickerRingCenter = document.querySelector('#colorPickerRingCenter')
    var colorPickerBg = document.querySelector('#backgroundPicker')
    url.placeholder = window.location.href

    var imageUrl = ''
    var urlDestino = url.value != '' ? url.value : window.location.href

    if (logoInput.files != null && logoInput.files.length > 0) {
        // Si se ha seleccionado un archivo de imagen, obtener su URL
        var logoFile = logoInput.files[0]
        imageUrl = URL.createObjectURL(logoFile)
    }

    if (document.getElementById('title') != null) document.getElementById('title').remove()
    if (document.getElementById('qr') != null) document.getElementById('qr').remove()
    if (document.getElementById('download') != null) document.getElementById('download').remove()
    if (document.querySelector('#size') != null) document.querySelector('#size').remove()

    var qr = document.createElement('qr-code')
    qr.setAttribute('id', 'qr')
    qr.contents = urlDestino
    // qr.maskXToYRatio = 3.5
    qr.moduleColor = colorPicker.value
    qr.positionRingColor = colorPickerRing.value
    qr.positionCenterColor = colorPickerRingCenter.value
    qr.style.height = '300px'
    qr.style.width = '300px'
    qr.style.marginLeft = 'auto'
    qr.style.marginRight = 'auto'
    qr.style.marginTop = '1vh'
    qr.style.marginBottom = '1vh'
    qr.style.backgroundColor = colorPickerBg.value
    qr.style.borderRadius = '8px'
    // qr.style.display = 'flex'
    qr.style.justifyContent = 'center'
    qr.style.alignItems = 'center'

    if (imageUrl) {
        var img = document.createElement('img')
        img.src = imageUrl
        img.setAttribute('slot', 'icon')
        img.style.width = '86px'
        img.style.height = '86px'
        qr.appendChild(img)
    }

    var downloadBtn = document.createElement('button')
    downloadBtn.setAttribute('id', 'download')
    downloadBtn.innerHTML = 'Descargar'
    downloadBtn.style.width = '30vw'
    downloadBtn.style.border = '0'
    downloadBtn.style.borderRadius = '6px'
    downloadBtn.style.marginLeft = 'auto'
    downloadBtn.style.marginRight = 'auto'
    // downloadBtn.style.padding = '1vh'

    var h1 = document.createElement('h1')
    h1.innerHTML = 'Tu Código QR'
    h1.setAttribute('id', 'title')

    config.appendChild(h1)
    config.appendChild(qr)
    config.appendChild(downloadBtn)

    function optionSelected(n) {
        // Captura el contenido del qr-code como imagen
        html2canvas(qr).then(canvas => {
            var desiredWidth = 1200; // Ancho en píxeles
            var desiredHeight = 1200; // Alto en píxeles

            // Tamaño deseado para la imagen
            switch (n) {
                case 1:
                    desiredWidth = 500;
                    desiredHeight = 500;
                    break;
                case 2:
                    desiredWidth = 1000;
                    desiredHeight = 1000;
                    break;
                case 3:
                    desiredWidth = 2000;
                    desiredHeight = 2000;
                    break;
            }

            // Crea un canvas temporal para redimensionar la imagen
            var tempCanvas = document.createElement('canvas');
            var tempContext = tempCanvas.getContext('2d');

            // Habilita la interpolación de alta calidad
            tempContext.imageSmoothingEnabled = true;

            tempCanvas.width = desiredWidth;
            tempCanvas.height = desiredHeight;

            // Redimensiona la imagen al tamaño deseado
            tempContext.drawImage(canvas, 0, 0, desiredWidth, desiredHeight);

            // Convierte el canvas redimensionado a una URL de datos de imagen
            var resizedImgData = tempCanvas.toDataURL('image/png');

            // Nombre de archivo para la descarga
            var fileName = urlDestino.replace('http://', '').replace('https://', '') + '.png';

            // Crea un enlace temporal para la descarga
            var link = document.createElement('a');
            link.href = resizedImgData;
            link.download = fileName;

            // Simula un clic en el enlace para iniciar la descarga
            link.click();

        })
    }

    downloadBtn.addEventListener('click', function () {
        if (document.querySelector('#size') != null) {
            document.querySelector('#size').remove()
        } else {
            var div = document.createElement('div')
            div.setAttribute('id', 'size')

            var h1 = document.createElement('h1')
            h1.innerHTML = 'Selecciona un tamaño'

            var button1 = document.createElement('button')
            button1.innerHTML = '500x500'
            button1.style.marginBottom = '10px'
            button1.addEventListener('click', function () {
                optionSelected(1)
            })

            var button2 = document.createElement('button')
            button2.innerHTML = '1000x1000'
            button2.style.marginBottom = '10px'
            button2.addEventListener('click', function () {
                optionSelected(2)
            })

            var button3 = document.createElement('button')
            button3.innerHTML = '2000x2000'
            button3.addEventListener('click', function () {
                optionSelected(3)
            })

            div.appendChild(h1)
            div.appendChild(button1)
            div.appendChild(button2)
            div.appendChild(button3)

            config.appendChild(div)
        }
    })

    document.getElementById('qr').addEventListener('codeRendered', () => {
        document.getElementById('qr').animateQRCode('MaterializeIn')
    })
}
