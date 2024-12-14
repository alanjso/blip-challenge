import axios from 'axios'

interface RepoParams {
    org: string;
    lang: string | undefined;
    quantity: number;
    order: 'asc' | 'desc';
}

interface Repo {
    html_url: any;
    full_name: string;
    description?: string;
    created_at: string;
    language: string | null;
    avatar_url: string
}

class GithubService {
    async getReposFromOrg({ org, lang, quantity, order }: RepoParams): Promise<Repo[]> {
        let loop = true;
        let repos: any[] = [];
        let page = 1;
        while (loop) {
            const partialRepos = await axios.get(`https://api.github.com/orgs/${org}/repos?page=${page}&per_page=100`, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN || ''}`,
                },
            });

            page++;
            if (partialRepos.data.length == 0) {
                loop = false;
            }
            repos = repos.concat(partialRepos.data);
        }
        if (lang) {
            repos = await this.filterLang(lang, repos);
        }

        const sortedRepos = repos.sort(
            (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        const finalRepos = sortedRepos.slice(0, quantity).map((repo: any) => ({
            full_name: repo.full_name,
            description: repo.description,
            created_at: repo.created_at,
            html_url: repo.html_url,
            language: repo.language,
            avatar_url: repo.owner.avatar_url
        }));

        return finalRepos;
    }

    async filterLang(lang: string, repos: any[]): Promise<any[]> {
        return repos.filter(
            (repo: any) => repo.language === lang
        );
    }
}
/*
{
    "id": 13860708,
    "node_id": "MDEwOlJlcG9zaXRvcnkxMzg2MDcwOA==",
    "name": "library.data",
    "full_name": "takenet/library.data",
    "private": false,
    "owner": {
      "login": "takenet",
      "id": 4369522,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjQzNjk1MjI=",
      "avatar_url": "https://avatars.githubusercontent.com/u/4369522?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/takenet",
      "html_url": "https://github.com/takenet",
      "followers_url": "https://api.github.com/users/takenet/followers",
      "following_url": "https://api.github.com/users/takenet/following{/other_user}",
      "gists_url": "https://api.github.com/users/takenet/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/takenet/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/takenet/subscriptions",
      "organizations_url": "https://api.github.com/users/takenet/orgs",
      "repos_url": "https://api.github.com/users/takenet/repos",
      "events_url": "https://api.github.com/users/takenet/events{/privacy}",
      "received_events_url": "https://api.github.com/users/takenet/received_events",
      "type": "Organization",
      "user_view_type": "public",
      "site_admin": false
    },
    "html_url": "https://github.com/takenet/library.data",
    "description": "Provides a simple abstraction for implementing the repository and unit of work patterns for data-enabled applications",
    "fork": false,
    "url": "https://api.github.com/repos/takenet/library.data",
    "forks_url": "https://api.github.com/repos/takenet/library.data/forks",
    "keys_url": "https://api.github.com/repos/takenet/library.data/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/takenet/library.data/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/takenet/library.data/teams",
    "hooks_url": "https://api.github.com/repos/takenet/library.data/hooks",
    "issue_events_url": "https://api.github.com/repos/takenet/library.data/issues/events{/number}",
    "events_url": "https://api.github.com/repos/takenet/library.data/events",
    "assignees_url": "https://api.github.com/repos/takenet/library.data/assignees{/user}",
    "branches_url": "https://api.github.com/repos/takenet/library.data/branches{/branch}",
    "tags_url": "https://api.github.com/repos/takenet/library.data/tags",
    "blobs_url": "https://api.github.com/repos/takenet/library.data/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/takenet/library.data/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/takenet/library.data/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/takenet/library.data/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/takenet/library.data/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/takenet/library.data/languages",
    "stargazers_url": "https://api.github.com/repos/takenet/library.data/stargazers",
    "contributors_url": "https://api.github.com/repos/takenet/library.data/contributors",
    "subscribers_url": "https://api.github.com/repos/takenet/library.data/subscribers",
    "subscription_url": "https://api.github.com/repos/takenet/library.data/subscription",
    "commits_url": "https://api.github.com/repos/takenet/library.data/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/takenet/library.data/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/takenet/library.data/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/takenet/library.data/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/takenet/library.data/contents/{+path}",
    "compare_url": "https://api.github.com/repos/takenet/library.data/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/takenet/library.data/merges",
    "archive_url": "https://api.github.com/repos/takenet/library.data/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/takenet/library.data/downloads",
    "issues_url": "https://api.github.com/repos/takenet/library.data/issues{/number}",
    "pulls_url": "https://api.github.com/repos/takenet/library.data/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/takenet/library.data/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/takenet/library.data/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/takenet/library.data/labels{/name}",
    "releases_url": "https://api.github.com/repos/takenet/library.data/releases{/id}",
    "deployments_url": "https://api.github.com/repos/takenet/library.data/deployments",
    "created_at": "2013-10-25T13:04:51Z",
    "updated_at": "2023-01-28T07:48:11Z",
    "pushed_at": "2013-10-25T16:09:45Z",
    "git_url": "git://github.com/takenet/library.data.git",
    "ssh_url": "git@github.com:takenet/library.data.git",
    "clone_url": "https://github.com/takenet/library.data.git",
    "svn_url": "https://github.com/takenet/library.data",
    "homepage": null,
    "size": 9364,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "C#",
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": false,
    "has_discussions": false,
    "forks_count": 0,
    "mirror_url": null,
    "archived": true,
    "disabled": false,
    "open_issues_count": 0,
    "license": {
      "key": "gpl-2.0",
      "name": "GNU General Public License v2.0",
      "spdx_id": "GPL-2.0",
      "url": "https://api.github.com/licenses/gpl-2.0",
      "node_id": "MDc6TGljZW5zZTg="
    },
    "allow_forking": true,
    "is_template": false,
    "web_commit_signoff_required": false,
    "topics": [],
    "visibility": "public",
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "permissions": {
      "admin": false,
      "maintain": false,
      "push": false,
      "triage": false,
      "pull": true
    }
  }
*/
export default new GithubService();
