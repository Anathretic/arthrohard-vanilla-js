//---------------------------------------------------------------------------------------------
// Selectors
//---------------------------------------------------------------------------------------------

const mobileNav = document.querySelector('.nav__mobile-items');
const menuItems = document.querySelectorAll('.nav__desktop-item a');
const scrollSpySections = document.querySelectorAll('.section');

const productsContainer = document.getElementById('productsContainer');
const productSelect = document.getElementById('productSelect');
const errorElement = document.getElementById('error');
const popupContainer = document.getElementById('popupContainer');
const popupContent = document.getElementById('popupContent');
const popupId = document.getElementById('popupId');
const popupName = document.getElementById('popupName');
const popupValue = document.getElementById('popupValue');
const closePopupButton = document.getElementById('closePopup');

//---------------------------------------------------------------------------------------------
// Navigation
//---------------------------------------------------------------------------------------------

const handleLogo = () => {
	window.location.href = '#';
};

const toggleMenu = () => {
	mobileNav.classList.toggle('nav__mobile-items--active');
};

const handleScrollSpy = () => {
	let currentSection = null;

	scrollSpySections.forEach(section => {
		if (window.scrollY >= section.offsetTop - 140 && window.scrollY < section.offsetTop + section.offsetHeight - 140) {
			currentSection = section;
		}
	});

	menuItems.forEach(item => item.classList.remove('active'));

	if (currentSection) {
		const activeSection = document.querySelector(`[href*="${currentSection.id}"]`);
		if (activeSection) {
			activeSection.classList.add('active');
		}
	}
};

const navHeight = document.querySelector('.nav__desktop').offsetHeight;
document.documentElement.style.setProperty('--scroll-padding', navHeight - 1 + 'px');

//---------------------------------------------------------------------------------------------
// Products List
//---------------------------------------------------------------------------------------------

const URL = 'https://brandstestowy.smallhost.pl/api/';

let productArrayValue = 8;
let isVisible = false;
let selectedItem = null;

const fetchProducts = () => {
	fetch(`${URL}random?pageNumber=1&pageSize=${productArrayValue}`)
		.then(res => res.json())
		.then(products => {
			if (products && products.data) {
				productsContainer.innerHTML = '';
				products.data.forEach(item => {
					const productElement = document.createElement('div');
					productElement.className = 'product__item';
					productElement.innerHTML = `<p class='product__item-text'>ID: ${item.id}</p>`;
					productElement.addEventListener('click', () => handleClick(item));
					productsContainer.appendChild(productElement);
				});
			}
		})
		.catch(() => {
			errorElement.style.display = 'block';
		});
};

const onScroll = () => {
	const scrolledTo = window.scrollY + window.innerHeight;
	if (document.body.scrollHeight === scrolledTo) {
		productArrayValue += 12;
		fetchProducts();
	}
};

const observer = new IntersectionObserver(
	entries => {
		if (entries[0].isIntersecting && !isVisible) {
			isVisible = true;
			observer.disconnect();
			fetchProducts();
		}
	},
	{
		root: null,
		rootMargin: '0px',
		threshold: 0.1,
	}
);

observer.observe(document.getElementById('produkty'));

const handleClick = item => {
	selectedItem = item;
	popupId.textContent = `ID ${item.id}`;
	popupName.textContent = item.name;
	popupValue.textContent = item.value;
	popupContainer.style.display = 'flex';
};

productSelect.addEventListener('change', e => {
	productArrayValue = Number(e.currentTarget.value);
	fetchProducts();
});

closePopupButton.addEventListener('click', () => {
	popupContainer.style.display = 'none';
});

//---------------------------------------------------------------------------------------------
// Shared Listeners
//---------------------------------------------------------------------------------------------

window.addEventListener('scroll', () => {
	onScroll();
	handleScrollSpy();
});

window.addEventListener('touchmove', () => {
	onScroll();
	handleScrollSpy();
});
