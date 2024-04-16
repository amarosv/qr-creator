var config = document.querySelector('#config')
var url = document.querySelector('#url')
var logoInput = document.querySelector('#arc')
var colorPicker = document.querySelector('#colorPicker')
var colorPickerRing = document.querySelector('#colorPickerRing')
var colorPickerRingCenter = document.querySelector('#colorPickerRingCenter')
var colorPickerBg = document.querySelector('#backgroundPicker')
var removeImg = document.querySelector('#removeImg')
var urlActual = window.location.href;

genDefault()

url.addEventListener('input', function() {
    if (url.value != '') {
        gen()
    } else {
        genDefault()
    }
})

logoInput.addEventListener('change', function() {
    var logoInput = document.querySelector('#logo');
    if (logoInput.files != null && logoInput.files.length > 0) {
        gen()
    } else {
        genDefault()
    }
})


colorPicker.addEventListener('input', function() {
    if (url.value != '') {
        gen()
    } else {
        genDefault()
    }
})

colorPickerRing.addEventListener('input', function() {
    if (url.value != '') {
        gen()
    } else {
        genDefault()
    }
})

colorPickerRingCenter.addEventListener('input', function() {
    if (url.value != '') {
        gen()
    } else {
        genDefault()
    }
})

colorPickerBg.addEventListener('input', function() {
    if (url.value != '') {
        gen()
    } else {
        genDefault()
    }
})

var generar = document.querySelector('#generarBt')
generar.addEventListener('click', function() {
    if (url.value != '') {
        gen()
    } else {
        genDefault()
    }
})

removeImg.addEventListener('click', function() {
    logoInput.value = null
    if (url.value != '') {
        gen()
    } else {
        genDefault()
    }
})

function gen() {

    var imageUrl = ''

    if (logoInput.files != null && logoInput.files.length > 0) {
        // Si se ha seleccionado un archivo de imagen, obtener su URL
        var logoFile = logoInput.files[0]
        imageUrl = URL.createObjectURL(logoFile)
    }
    
    if (url.value != '') {
        if (document.getElementById('title') != null) document.getElementById('title').remove()
        if (document.getElementById('qr') != null) document.getElementById('qr').remove()
        if (document.getElementById('download') != null) document.getElementById('download').remove()

        var qr = document.createElement('qr-code')
        qr.setAttribute('id', 'qr')
        qr.contents = url.value
        // qr.maskXToYRatio = 3.5
        qr.moduleColor = colorPicker.value
        qr.positionRingColor = colorPickerRing.value
        qr.positionCenterColor = colorPickerRingCenter.value
        qr.style.height = '400px'
        qr.style.width = '400px'
        qr.style.marginLeft = 'auto'
        qr.style.marginRight = 'auto'
        qr.style.marginTop = '1vh'
        qr.style.marginBottom = '1vh'
        qr.style.backgroundColor = colorPickerBg.value
        qr.style.borderRadius = '8px'

        if (imageUrl) {
            var img = document.createElement('img')
            img.src = imageUrl
            img.setAttribute('slot', 'icon')
            // img.style.height = '100vh'
            // img.style.width = '100vh'
            // img.style.left = '20%'
            // img.style.right = '50%'
            img.style.maxWidth = '80px'
            img.style.maxHeight = '80px'
            // img.style.height = '68px'
            // img.style.height = '10v'
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
        downloadBtn.style.padding = '1vh'

        var h1 = document.createElement('h1')
        h1.innerHTML = 'Tu Código QR'
        h1.setAttribute('id', 'title')

        config.appendChild(h1)
        config.appendChild(qr)
        config.appendChild(downloadBtn)

        downloadBtn.addEventListener('click', function() {
            // Captura el contenido del qr-code como imagen
            html2canvas(qr).then(canvas => {
                var imgData = canvas.toDataURL('image/png')
                var fileName = url.value.replace('http://', '').replace('https://', '') + '.png'

                // Crea un enlace temporal para la descarga
                var link = document.createElement('a')
                link.href = imgData
                link.download = fileName

                // Simula un clic en el enlace para iniciar la descarga
                link.click()

                // document.getElementById('qr').remove()
                // downloadBtn.remove()
            })
        })

        document.getElementById('qr').addEventListener('codeRendered', () => {
            document.getElementById('qr').animateQRCode('MaterializeIn')
        })
    } else {
        alert('Introduce una URL válida.')
    }
}

function genDefault() {

    var actualURL = window.location.href
    url.placeholder = actualURL

    var imageUrl = ''

    if (logoInput.files != null && logoInput.files.length > 0) {
        // Si se ha seleccionado un archivo de imagen, obtener su URL
        var logoFile = logoInput.files[0]
        imageUrl = URL.createObjectURL(logoFile)
    }

    if (document.getElementById('title') != null) document.getElementById('title').remove()
        if (document.getElementById('qr') != null) document.getElementById('qr').remove()
        if (document.getElementById('download') != null) document.getElementById('download').remove()

        var qr = document.createElement('qr-code')
        qr.setAttribute('id', 'qr')
        qr.contents = actualURL
        // qr.maskXToYRatio = 3.5
        qr.moduleColor = colorPicker.value
        qr.positionRingColor = colorPickerRing.value
        qr.positionCenterColor = colorPickerRingCenter.value
        qr.style.height = '400px'
        qr.style.width = '400px'
        qr.style.marginLeft = 'auto'
        qr.style.marginRight = 'auto'
        qr.style.marginTop = '1vh'
        qr.style.marginBottom = '1vh'
        qr.style.backgroundColor = colorPickerBg.value
        qr.style.borderRadius = '8px'

        if (imageUrl) {
            var img = document.createElement('img')
            img.src = imageUrl
            img.setAttribute('slot', 'icon')
            // img.style.height = '100vh'
            // img.style.width = '100vh'
            // img.style.left = '20%'
            // img.style.right = '50%'
            img.style.maxWidth = '80px'
            img.style.maxHeight = '80px'
            // img.style.height = '68px'
            // img.style.height = '10v'
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
        downloadBtn.style.padding = '1vh'

        var h1 = document.createElement('h1')
        h1.innerHTML = 'Tu Código QR'
        h1.setAttribute('id', 'title')

        config.appendChild(h1)
        config.appendChild(qr)
        config.appendChild(downloadBtn)

        downloadBtn.addEventListener('click', function() {
            // Captura el contenido del qr-code como imagen
            html2canvas(qr).then(canvas => {
                var imgData = canvas.toDataURL('image/png')
                var fileName = actualURL.replace('http://', '').replace('https://', '') + '.png'

                // Crea un enlace temporal para la descarga
                var link = document.createElement('a')
                link.href = imgData
                link.download = fileName

                // Simula un clic en el enlace para iniciar la descarga
                link.click()

                // document.getElementById('qr').remove()
                // downloadBtn.remove()
            })
        })

        document.getElementById('qr').addEventListener('codeRendered', () => {
            document.getElementById('qr').animateQRCode('MaterializeIn')
        })
}
