const mobileNav = document.querySelector('.nav__mobile-items');

const menuItems = document.querySelectorAll('.nav__desktop-item a');
const scrollSpySections = document.querySelectorAll('.section');

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

window.addEventListener('scroll', handleScrollSpy);
