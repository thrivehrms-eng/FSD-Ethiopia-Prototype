// Stand-in for the analytics script. It loads only after the visitor accepts
// analytics cookies, and it sends nothing anywhere.
window.fsdAnalyticsDemo = { loadedAt: new Date().toISOString() };
console.info('[prototype] Analytics would load here, after consent. No data was sent.');
