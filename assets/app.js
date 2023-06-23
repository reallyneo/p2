function loadDOM() {
    const blockTags = document.querySelectorAll('figure');

    if (blockTags.length === 0) {
        setTimeout(loadDOM, 100);
    } else {

        // above is a check-in function to detect if our are.na API has grabbed our content.
        // write all your codes inside of this else{} block.

        const blocks2 = Array.from(blockTags) 
        // turn HTML Collection to a JavaScript Array, prepare for the forEach() function

        blocks2.forEach(function (element) {
            // do something to each element inside of the blocks array, which is the <figure> tag in the HTML structure.

            const x = Math.random() * 20 + "vw"
            // Math.random() returns a value between 0 and 1, so it should be multiplied by the max value of the range you want.
            element.style.left = x
            console.log(element.style.left)

        })
    }
}

loadDOM(); // Start checking the DOM elements
