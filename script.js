document.addEventListener("DOMContentLoaded", function() {
    fetchRepoData();
    fetchContributors();
    fetchDependentRepos();
    fetchPullRequests();
    fetchBranches();
});

function fetchRepoData() {
    const repoURL = 'https://api.github.com/repos/simonzhang00/ripser-plusplus';
    
    fetch(repoURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById('star-count').innerText = data.stargazers_count;
            document.getElementById('fork-count').innerText = data.forks_count;
            // document.getElementById('watchers-count').innerText = data.watchers_count;
            document.getElementById('last-commit-date').innerText = new Date(data.pushed_at).toLocaleDateString();
            document.getElementById('repo-link').setAttribute('href', data.html_url);
        })
        .catch(error => {
            console.error('There was an error fetching the repo data', error);
        });
}

function fetchContributors() {
    fetch('https://api.github.com/repos/simonzhang00/ripser-plusplus/contributors')
        .then(response => response.json())
        .then(data => {
            const contributorsList = document.getElementById('contributors-list');
            data.forEach(contributor => {
                const li = document.createElement('li');
                li.textContent = contributor.login;
                contributorsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('There was an error fetching the contributors', error);
        });
}

function fetchDependentRepos() {
    fetch('./dependent_repos.json')  // Relative path to the JSON file
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById('dependent-repos-list');
            data.forEach(repo => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = repo.repo_link;
                a.textContent = `${repo.user_name} / ${repo.repo_name}`;
                a.target = "_blank";  // to open links in a new tab
                li.appendChild(a);
                repoList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('There was an error fetching the dependent repos', error);
        });
}

function fetchPullRequests() {
    fetch('https://api.github.com/repos/simonzhang00/ripser-plusplus/pulls')
        .then(response => response.json())
        .then(data => {
            document.getElementById('pull-requests-count').innerText = data.length;
        })
        .catch(error => {
            console.error('There was an error fetching the pull requests', error);
        });
}

function fetchBranches() {
    fetch('https://api.github.com/repos/simonzhang00/ripser-plusplus/branches')
        .then(response => response.json())
        .then(data => {
            document.getElementById('branches-count').innerText = data.length;
        })
        .catch(error => {
            console.error('There was an error fetching the branches', error);
        });
}