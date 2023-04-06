function getSvgTextWidth(text: string, fontSize: number, fontFamily: string): number {
    // create a temporary SVG element to calculate the text width
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElem.setAttribute('font-size', fontSize.toString());
    textElem.setAttribute('font-family', fontFamily);
    const textNode = document.createTextNode(text);
    textElem.appendChild(textNode);
    svg.appendChild(textElem);
    document.body.appendChild(svg);

    // get the bounding box of the text element and return its width
    const bbox = textElem.getBBox();
    const width = bbox.width;
    document.body.removeChild(svg);
    return width;
}