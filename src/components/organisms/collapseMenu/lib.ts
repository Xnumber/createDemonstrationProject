export const collapseMenuStyleCreator = (itemsLength: number) => {
	let collapseMenuStyleEl = document.getElementById("collapseMenuStyle") as HTMLStyleElement;
	if(collapseMenuStyleEl?.sheet?.cssRules) {
		collapseMenuStyleEl.textContent = "";
		collapseMenuStyleEl.textContent = collapseMenuStyleStringCreator(itemsLength);
	} else {
		collapseMenuStyleEl = document.createElement("style");
		collapseMenuStyleEl.id = "collapseMenuStyle";
		document.head.appendChild(collapseMenuStyleEl);	
		collapseMenuStyleEl.textContent = collapseMenuStyleStringCreator(itemsLength);
	}
};

const collapseMenuStyleStringCreator = (itemsLength: number) => {
	let styleSheetString = "";
	let count = 0;
	while(count < itemsLength) {
		styleSheetString += `.o-collapseMenu--collapse .o-collapseMenu__item:nth-of-type(${count + 1})` + "{" + `transform: translateY(${-100*count}%);` + "}";
		styleSheetString += `.o-collapseMenu__item:nth-of-type(${count + 1}) .m-pNavLink__decorator` + `{transition-delay:${count*100}ms;}`;
		count++;
	}
	return styleSheetString;
};