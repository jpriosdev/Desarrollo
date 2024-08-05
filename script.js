document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('activityForm');
    const activityList = document.getElementById('activities');
    const executePlanBtn = document.getElementById('executePlan');
    const modal = document.getElementById('executionModal');
    const closeModal = document.querySelector('.close');
    const executionDetails = document.getElementById('executionDetails');
    const nextActivityBtn = document.getElementById('nextActivity');
    let activities = [];
    let currentActivityIndex = 0;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const duration = document.getElementById('duration').value;
        const repetitions = document.getElementById('repetitions').value;

        const activity = { title, description, duration, repetitions };
        activities.push(activity);
        renderActivities();
        form.reset();
    });

    executePlanBtn.addEventListener('click', () => {
        if (activities.length > 0) {
            currentActivityIndex = 0;
            executeActivity();
            modal.style.display = 'block';
        } else {
            alert('Add at least one activity before executing the plan.');
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    nextActivityBtn.addEventListener('click', () => {
        if (currentActivityIndex < activities.length - 1) {
            currentActivityIndex++;
            executeActivity();
        } else {
            alert('You have completed all activities.');
            modal.style.display = 'none';
        }
    });

    function renderActivities() {
        activityList.innerHTML = '';
        activities.forEach((activity, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${activity.title} - ${activity.description} - ${activity.duration} min - ${activity.repetitions} reps
                <button onclick="deleteActivity(${index})">Delete</button>
            `;
            activityList.appendChild(li);
        });
    }

    window.deleteActivity = (index) => {
        activities.splice(index, 1);
        renderActivities();
    };

    function executeActivity() {
        const activity = activities[currentActivityIndex];
        executionDetails.innerHTML = `
            <h2>${activity.title}</h2>
            <p>${activity.description}</p>
            <p>Duration: ${activity.duration} min</p>
            <p>Repetitions: ${activity.repetitions}</p>
        `;
        // Add logic for countdown and alert sound
    }
});
