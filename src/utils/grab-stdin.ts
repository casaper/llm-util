export const grabStdin = new Promise<string>((resolve, reject) => {
  let data = '';
  process.stdin.on('data', chunk => (data += chunk));
  process.stdin.on('end', () => resolve(data));
  process.stdin.on('error', reject);
});
