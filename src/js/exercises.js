import { getExercises } from './api.js';
import { EVENTS, PAGINATION } from './constants.js';
import { showLoader, hideLoader } from './loader.js';

const exercisesList = document.getElementById('exercises-container');
const exercisesWrapper = document.querySelector('.exercises-wrapper');
const categoriesWrapper = document.querySelector('.categories-wrapper');
const searchForm = document.getElementById('search-form');
const selectedCategoryName = document.getElementById('selected-category-name');
const categorySlash = document.getElementById('category-slash');
const paginationContainer = document.getElementById('pagination-container');

let currentFilter = '';
let currentCategory = '';
let currentKeyword = '';
let currentPage = 1;

const getLimit = () => window.innerWidth >= 768 ? PAGINATION.EXERCISES_DESKTOP : PAGINATION.EXERCISES_MOBILE;

document.addEventListener(EVENTS.CATEGORY_SELECTED, async (event) => {
    const { filter, category } = event.detail;
    currentFilter = filter;
    currentCategory = category;
    currentPage = 1;
    currentKeyword = '';

    selectedCategoryName.textContent = category;
    categorySlash.classList.remove('visually-hidden');

    if (categoriesWrapper) categoriesWrapper.classList.add('visually-hidden');
    if (exercisesWrapper) exercisesWrapper.classList.remove('visually-hidden');

    if (searchForm) {
        searchForm.classList.remove('visually-hidden');
        searchForm.reset();
    }

    await fetchAndRenderExercises();
});

async function fetchAndRenderExercises() {
    try {
        showLoader();

        const filterKey = currentFilter.toLowerCase().replace(/\s+/g, '');
        const apiParam = filterKey === 'bodyparts' ? 'bodypart' : filterKey;

        const queryParams = {
            [apiParam]: currentCategory,
            keyword: currentKeyword,
            page: currentPage,
            limit: getLimit(),
        };

        const data = await getExercises(queryParams);

        if (!data || data.results.length === 0) {
            exercisesList.innerHTML = '<p class="no-results">Sorry, no exercises found.</p>';
            paginationContainer.innerHTML = '';
            return;
        }

        renderExerciseCards(data.results);
        renderPagination(data.totalPages);
    } catch (err) {
        console.error(err);
    } finally {
        hideLoader();
    }
}

function renderExerciseCards(exercises) {
    exercisesList.innerHTML = exercises
        .map(({ _id, name, burnedCalories, bodyPart, target, rating }) => `
            <li class="exercise-card">
                <div class="ex-card-header">
                    <div class="ex-badge">WORKOUT</div>
                    <div class="ex-rating">
                        ${rating.toFixed(1)}
                        <svg width="16" height="16" aria-hidden="true"><use href="./images/sprite.svg#icon-star"></use></svg>
                    </div>
                    <button class="ex-start-btn" data-id="${_id}">
                        Start →
                    </button>
                </div>
                <h3 class="ex-title">
                    <svg class="ex-icon" width="24" height="24" aria-hidden="true"><use href="./images/sprite.svg#icon-run"></use></svg>
                    ${name}
                </h3>
                <div class="ex-info">
                    <p>Burned calories: <span>${burnedCalories} / 3 min</span></p>
                    <p>Body part: <span>${bodyPart}</span></p>
                    <p>Target: <span>${target}</span></p>
                </div>
            </li>
        `)
        .join('');

    exercisesList.querySelectorAll('.ex-start-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.dispatchEvent(
                new CustomEvent(EVENTS.EXERCISE_OPEN, { detail: { id: btn.dataset.id } })
            );
        });
    });
}

function renderPagination(totalPages) {
    if (!totalPages || totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    paginationContainer.innerHTML = Array.from({ length: totalPages }, (_, i) => i + 1)
        .map(page => `
            <button
                class="pagination-btn ${page === currentPage ? 'active' : ''}"
                type="button"
                data-page="${page}"
            >${page}</button>
        `)
        .join('');

    paginationContainer.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            currentPage = Number(btn.dataset.page);
            await fetchAndRenderExercises();
        });
    });
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (currentCategory) {
            currentPage = 1;
            fetchAndRenderExercises();
        }
    }, 300);
});

if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        currentKeyword = e.target.elements.query.value.trim().toLowerCase();
        currentPage = 1;
        await fetchAndRenderExercises();
    });
}