// The Description is returned as Markdown, of course.
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js';
document.head.appendChild(markdownIt)

const setBasics = (data) => {
	document.title = data.title
	document.getElementById('channel-title').innerHTML = data.title
	document.getElementById('channel-description').innerHTML = window.markdownit().render(data.metadata.description)

	// Add author/collaborators with image/links.
	// Error proof these.
}



const parseBlocks = (data) => {
	let blocks = [
		'audioEmbed',
		'audioFile',
		'image',
		'link',
		'pdf',
		'text',
		'videoEmbed',
		'videoFile',
	]

	blocks.forEach((type) => {
		let typeClass = type.replace(/[A-Z]/g, "-$&").toLowerCase()
		let typeName = type.split(/[A-Z]/g)[0];
		(typeName == 'pdf') ? typeName = typeName.toUpperCase() : typeName = typeName[0].toUpperCase() + typeName.slice(1)

		let typeContainer = document.querySelector(`.${typeClass}-blocks`)
		let typeTemplate = document.getElementById(`${typeClass}-block`)

		blocks[type] = {
			name: typeName,
			container: typeContainer,
			template: typeTemplate ? typeTemplate.content : null,
		}
	})

	data.contents.slice().reverse().forEach((block) => {
		switch (block.class) {
			case 'Attachment':
				let attachment = block.attachment.content_type
				if (attachment.includes('audio')) {
					renderBlock(block, blocks.audioFile)
				}
				else if (attachment.includes('pdf')) {
					renderBlock(block, blocks.pdf)
				}
				else if (attachment.includes('video')) {
					renderBlock(block, blocks.videoFile)
				}
				break

			case 'Image':
				renderBlock(block, blocks.image)
				break

			case 'Link':
				renderBlock(block, blocks.link)
				break

			case 'Media':
				let media = block.embed.type
				if (media.includes('rich')) {
					renderBlock(block, blocks.audioEmbed)
				}
				else if (media.includes('video')) {
					renderBlock(block, blocks.videoEmbed)
				}
				break

			case 'Text':
				renderBlock(block, blocks.text)
				break
		}
	})
}



const renderBlock = (block, type) => {
	if (!type.template || !type.container) return

	let template = type.template.cloneNode(true)
	let element = [
		'title',
		'image',
		'embed',
		'audio',
		'video',
		'link',
		'linkTitle',
		'content',
		'description',
		'type',
	]

	element = Object.assign({},
		...element.map(type => ({
			[type]: template.querySelector(`.${type.replace(/[A-Z]/g, "-$&").toLowerCase()}`)
		}))
	)

	if (element.title) block.title ? element.title.innerHTML = block.title : element.title.remove()
	if (element.image) block.image ? element.image.src = block.image.large.url : element.image.remove()
	if (element.embed) block.embed ? element.embed.innerHTML = block.embed.html : element.embed.remove()
	if (element.audio) block.attachment ? element.audio.src = block.attachment.url : element.audio.remove()
	if (element.video) block.attachment ? element.video.src = block.attachment.url : element.video.remove()
	if (element.link) {
		if (block.source) {
			element.link.href = block.source.url
			if (element.linkTitle) element.linkTitle.innerHTML = block.source.title
		}
		else if (block.attachment) {
			element.link.href = block.attachment.url
			if (element.linkTitle) element.linkTitle.innerHTML = block.title
		}
		else {
			element.link.remove()
			element.linkTitle.remove()
		}
	}
	if (element.content) block.content_html ? element.content.innerHTML = block.content_html : element.content.remove()
	if (element.description) block.description_html ? element.description.innerHTML = block.description_html : element.description.remove()
	if (element.type) element.type.innerHTML = type.name

	type.container.append(template)
}


window.addEventListener('DOMContentLoaded', () => {
	const channel = document.getElementById('channel-url').href.split('/').filter(Boolean).pop()

	fetch(`https://api.are.na/v2/channels/${channel}?per=100`, {cache: 'no-store'})
		.then(response => response.json())
		.then(data => {
			setBasics(data)
			parseBlocks(data)
		})
});


const getRandom = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

const square= document.querySelector('#square');

const shadow = document.querySelector('.shadow');

document.addEventListener('mousemove', (e) => {
  let x = e.clientX - (document.documentElement.clientWidth * 1.5);
  let y = e.clientY - (document.documentElement.clientHeight * 1.5);
  shadow.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
})

var body = document.body,
	html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
	html.clientHeight, html.scrollHeight, html.offsetHeight );

var ending = height + 50;



const shadowTag = document.querySelector(".shadow")


setTimeout(() => body.addEventListener("mousedown", function(){
	window.scrollBy({
		top: window.innerHeight,
		left: 0,
		behavior: "smooth"
	})
}), 5000)


var a = 1; //y-axis pixel displacement
var z = 1; //delay in milliseconds

function scrollf() {
	// let m = window.scrollY
	let a = window.scrollY;
	a = a + 0.5;
	console.log(a);
	window.scroll(window.scrollX, a);
	if (a < 1999 && a > 420) {
		body.style.backgroundColor = "yellow";
	} else if (a > 2000 && a < 3199) {
		body.style.backgroundColor = "#90EE90";
	} else if (a > 3200 && a < 7499) {
		body.style.backgroundColor = "#1F38C1"
	} else if (a > 7500 && a < 10199) {
		body.style.backgroundColor = "red"
	} else if (a > 10200 && a < 12499) {
		body.style.backgroundColor = "orange"
	} else if (a > 12500 && a < 16499) {
		body.style.backgroundColor = "pink"
	} else if (a > 16500 && a < 19199) {
		body.style.backgroundColor = "black"
	} else if (a > 19200 && a < 22199) {
		body.style.backgroundColor = "#301934"
	} else if (a > 22200 && a < 25399) {
		body.style.backgroundColor = "#967bb6"
	} else if (a > 25400 && a < 32499) {
		body.style.backgroundColor = "#FFC000"
	} else if (a > 32500 && a < 45399) {
		body.style.backgroundColor = "#EE408A"
	} else if (a > 45400) {
		a = 1;
		setTimeout(() => window.scroll(0, a), 3000);
	} else {
		body.style.backgroundColor = "#2C272B"
	}
};

setTimeout(() => setInterval(scrollf, z), 6000);

function resetpage() {
	if (window.scrollY > 45000) {
		location.reload()
	}
}

resetpage();