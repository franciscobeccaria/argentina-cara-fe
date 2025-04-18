export async function triggerGitHubWorkflow() {
  const repo = "franciscobeccaria/dolar-caro-gha"
  const workflowFileName = "price-scraper.yml"
  const githubToken = process.env.GITHUB_PAT!
  const ref = "main"

  const res = await fetch(`https://api.github.com/repos/${repo}/actions/workflows/${workflowFileName}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({ ref }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error("❌ Error triggering GitHub Workflow:", text)
    throw new Error("Failed to trigger workflow")
  }

  console.log("✅ GitHub Workflow triggered successfully")
}
