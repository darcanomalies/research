// Data of Anomalous Objects (This could come from an API in a real project)
const allObjects = [
    {
        id: 'A-001',
        title: 'Object A-001: The Whispering Cube',
        image: 'https://via.placeholder.com/400x250/330000/DDDDDD?text=A-001+Whispering+Cube',
        shortDescription: 'A metallic cube emitting hypnotic whispers in ancient languages, altering reality perception within 5 meters.',
        detailFile: 'A-001.html' // Path to the individual object detail page
    },
    {
        id: 'A-002',
        title: 'Object A-002: The Chrono-Flower',
        image: 'https://via.placeholder.com/400x250/003300/DDDDDD?text=A-002+Chrono-Flower',
        shortDescription: 'A plant whose petals bloom and wilt in seconds. Pollen exposure can cause local time distortion.',
        detailFile: 'objects/A-002.html'
    },
    {
        id: 'A-003',
        title: 'Object A-003: The Living Shadow',
        image: 'https://via.placeholder.com/400x250/000033/DDDDDD?text=A-003+Living+Shadow',
        shortDescription: 'A sentient shadow entity that can manipulate small physical objects and induce paranoia.',
        detailFile: 'objects/A-003.html'
    },
    {
        id: 'A-004',
        title: 'Object A-004: The Shifting Sands',
        image: 'https://via.placeholder.com/400x250/333300/DDDDDD?text=A-004+Shifting+Sands',
        shortDescription: 'A 1 km² desert area that randomly changes topography, sometimes creating oases or sinkholes instantly.',
        detailFile: 'objects/A-004.html'
    },
    {
        id: 'A-005',
        title: 'Object A-005: The Mimic Doll',
        image: 'https://via.placeholder.com/400x250/330033/DDDDDD?text=A-005+Mimic+Doll',
        shortDescription: 'An old porcelain doll that mimics the voice, body language, and memories of those who interact with it.',
        detailFile: 'objects/A-005.html'
    },
    {
        id: 'A-006',
        title: 'Object A-006: The Infinite Library',
        image: 'https://via.placeholder.com/400x250/003333/DDDDDD?text=A-006+Infinite+Library',
        shortDescription: 'An anomalous space resembling a library with endless shelves whose contents constantly change.',
        detailFile: 'objects/A-006.html'
    },
    {
        id: 'A-007',
        title: 'Object A-007: The Dream Weaver',
        image: 'https://via.placeholder.com/400x250/333333/DDDDDD?text=A-007+Dream+Weaver',
        shortDescription: 'A non-physical entity that can enter and manipulate individuals\' dreams, affecting waking mental states.',
        detailFile: 'objects/A-007.html'
    },
    {
        id: 'A-008',
        title: 'Object A-008: The Sentient Statue',
        image: 'https://via.placeholder.com/400x250/660000/DDDDDD?text=A-008+Sentient+Statue',
        shortDescription: 'A life-sized marble statue that can animate and move when not observed, exhibiting extreme strength.',
        detailFile: 'objects/A-008.html'
    },
    {
        id: 'A-009',
        title: 'Object A-009: The Echoing Well',
        image: 'https://via.placeholder.com/400x250/000066/DDDDDD?text=A-009+Echoing+Well',
        shortDescription: 'An old well that, when an object is thrown into it, echoes sounds from future events.',
        detailFile: 'objects/A-009.html'
    },
    {
        id: 'A-010',
        title: 'Object A-010: The Glitching Portal',
        image: 'https://via.placeholder.com/400x250/663300/DDDDDD?text=A-010+Glitching+Portal',
        shortDescription: 'A spatial anomaly periodically opening small, unstable portals to unknown dimensions or locations.',
        detailFile: 'objects/A-010.html'
    },
    {
        id: 'A-011',
        title: 'Object A-011: The Symbiotic Bloom',
        image: 'https://via.placeholder.com/400x250/006600/DDDDDD?text=A-011+Symbiotic+Bloom',
        shortDescription: 'A parasitic plant forming symbiotic relationships with living organisms, drastically boosting host abilities with harmful long-term effects.',
        detailFile: 'objects/A-011.html'
    },
    {
        id: 'A-012',
        title: 'Object A-012: The Reality Glitch',
        image: 'https://via.placeholder.com/400x250/000088/DDDDDD?text=A-012+Reality+Glitch',
        shortDescription: 'A small area where local laws of physics can randomly flicker or change, affecting gravity, teleportation, or colors.',
        detailFile: 'objects/A-012.html'
    },
    {
        id: 'A-013',
        title: 'Object A-013: The Silent Bell',
        image: 'https://via.placeholder.com/400x250/660066/DDDDDD?text=A-013+Silent+Bell',
        shortDescription: 'An old bronze bell that, when rung, produces no sound but silences all surrounding noises for minutes, causing disorientation.',
        detailFile: 'objects/A-013.html'
    },
    {
        id: 'A-014',
        title: 'Object A-014: The Chrono-Parasite',
        image: 'https://via.placeholder.com/400x250/884400/DDDDDD?text=A-014+Chrono-Parasite',
        shortDescription: 'A small insect species that attaches to hosts and drastically accelerates cellular aging.',
        detailFile: 'objects/A-014.html'
    },
    {
        id: 'A-015',
        title: 'Object A-015: The Mirror World',
        image: 'https://via.placeholder.com/400x250/888800/DDDDDD?text=A-015+Mirror+World',
        shortDescription: 'An antique mirror that, under certain conditions, reflects alternate worlds or possible futures. Entities may interact or emerge.',
        detailFile: 'objects/A-015.html'
    }
];

let loadedObjects = 0;
const objectsPerPage = 6;
let filteredObjects = [];

const objectGrid = document.getElementById('objectGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const searchInput = document.getElementById('searchInput');
const objectModal = document.getElementById('objectModal');
const modalCloseBtn = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modalTitle');
const modalBodyContent = document.getElementById('modalBodyContent');

// Function to load objects into the DOM
function loadMoreObjects() {
    loadingIndicator.style.display = 'block';

    setTimeout(() => {
        const currentObjects = filteredObjects.slice(loadedObjects, loadedObjects + objectsPerPage);

        if (currentObjects.length === 0 && loadedObjects > 0) {
            loadingIndicator.textContent = "All data has been loaded.";
            return;
        }
        if (currentObjects.length === 0 && loadedObjects === 0 && searchInput.value !== '') {
            loadingIndicator.textContent = "No results found.";
            return;
        }

        currentObjects.forEach(obj => {
            const objectItem = document.createElement('div');
            objectItem.className = 'object-item';
            // We only need the detailFile and title for the click handler
            objectItem.setAttribute('data-detail-file', obj.detailFile);
            objectItem.setAttribute('data-title', obj.title);


            objectItem.innerHTML = `
                <img src="${obj.image}" alt="${obj.title}">
                <div class="object-item-info">
                    <h3>${obj.title}</h3>
                    <p>${obj.shortDescription}</p>
                    <span class="read-more">View Details <i class="fas fa-arrow-right"></i></span>
                </div>
            `;
            objectGrid.appendChild(objectItem);

            // Add event listener for pop-up
            objectItem.addEventListener('click', () => {
                modalTitle.textContent = obj.title; // Set title immediately
                modalBodyContent.innerHTML = 'Loading object details... <i class="fas fa-spinner fa-spin"></i>'; // Show loading spinner
                objectModal.style.display = 'block';

                // Fetch the content of the external HTML file
                fetch(obj.detailFile)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(html => {
                        // Insert the fetched HTML into the modal body
                        modalBodyContent.innerHTML = html;
                    })
                    .catch(error => {
                        console.error('Error fetching object details:', error);
                        modalBodyContent.innerHTML = `<p style="color: ${getComputedStyle(document.documentElement).getPropertyValue('--accent-color')};">Error loading details: ${error.message}. Please try again.</p>`;
                    });
            });
        });

        loadedObjects += currentObjects.length;
        loadingIndicator.style.display = 'none';
    }, 700);
}

// Observer for Lazy Loading
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && loadedObjects < filteredObjects.length) {
        loadMoreObjects();
    }
}, {
    root: null, // viewport
    rootMargin: '0px 0px 200px 0px', // Load when 200px from bottom
    threshold: 0.1
});

// Event listener for Search
searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filteredObjects = allObjects.filter(obj =>
        obj.title.toLowerCase().includes(searchTerm) ||
        obj.shortDescription.toLowerCase().includes(searchTerm) ||
        obj.id.toLowerCase().includes(searchTerm)
        // You might want to add data from the detail HTML files to the search too,
        // but that requires fetching all of them which defeats lazy loading benefits.
        // For now, search only applies to the main object data.
    );

    objectGrid.innerHTML = ''; // Clear the grid
    loadedObjects = 0; // Reset counter
    observer.disconnect(); // Stop observing temporarily
    observer.observe(loadingIndicator); // Re-observe
    loadMoreObjects(); // Reload filtered objects
});

// Event listener to close the modal
modalCloseBtn.addEventListener('click', () => {
    objectModal.style.display = 'none';
});

// Close modal if click outside modal content
window.addEventListener('click', (event) => {
    if (event.target === objectModal) {
        objectModal.style.display = 'none';
    }
});

// Initialization: Load objects for the first time
document.addEventListener('DOMContentLoaded', () => {
    filteredObjects = [...allObjects];
    loadMoreObjects();
    observer.observe(loadingIndicator); // Start observing the loading indicator
});