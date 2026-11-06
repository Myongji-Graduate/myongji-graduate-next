import { createServer } from 'node:http';

// Deliberately hand-authored contract data. This is not an academic-policy engine.
export async function startFixture() {
  let added = false;
  const requests = [];
  const course = { id: 'SYN122', name: '합성검증과목', credit: 3 };
  const credit = () => (added ? 6 : 3);
  const snapshot = () => ({ added, takenCredit: credit(), remainingCredit: 12 - credit(), requests: [...requests] });
  const server = createServer(async (req, res) => {
    const path = new URL(req.url, 'http://127.0.0.1').pathname;
    const origin = req.headers.origin;
    if (origin && /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Content-Type', 'application/json');
    const send = (status, body) => {
      res.statusCode = status;
      res.end(JSON.stringify(body));
    };
    if (req.method === 'OPTIONS') {
      requests.push({
        method: 'OPTIONS',
        path,
        origin,
        requestedHeaders: req.headers['access-control-request-headers'],
      });
      return send(200, {});
    }
    if (path === '/__state') return send(200, snapshot());
    let body = '';
    for await (const chunk of req) body += chunk;
    requests.push({ method: req.method, path, takenCredit: credit() });
    if (path === '/auth/sign-in' && req.method === 'POST') {
      const data = JSON.parse(body);
      return data.authId === 'synthetic122' && data.password === 'synthetic-only'
        ? send(200, { accessToken: 'dev122-synthetic-access', refreshToken: 'dev122-synthetic-refresh' })
        : send(401, { message: 'Synthetic credentials required' });
    }
    if (req.headers.authorization !== 'Bearer dev122-synthetic-access') return send(401, { message: 'Unauthorized' });
    if (path === '/users/me')
      return send(200, {
        studentNumber: 'SYN00122',
        studentName: '합성학생',
        completeDivision: [{ majorType: 'PRIMARY', major: '영어영문학전공' }],
        totalCredit: 12,
        takenCredit: credit(),
        graduated: false,
      });
    if (path === '/lectures') return send(200, [{ ...course, taken: added, revoked: false }]);
    if (path === '/taken-lectures' && req.method === 'POST') {
      if (JSON.parse(body).lectureId !== course.id || added) return send(400, { message: 'Invalid synthetic course' });
      added = true;
      return send(200, {});
    }
    if (path === '/taken-lectures/122' && req.method === 'DELETE') {
      if (!added) return send(400, { message: 'Not taken' });
      added = false;
      return send(200, {});
    }
    if (path === '/taken-lectures' && req.method === 'GET')
      return send(200, {
        totalCredit: credit(),
        takenLectures: [
          { id: 121, year: '2025', semester: '1학기', lectureCode: 'SYN121', lectureName: '합성기준과목', credit: 3 },
          ...(added
            ? [
                {
                  id: 122,
                  year: 'CUSTOM',
                  semester: 'CUSTOM',
                  lectureCode: course.id,
                  lectureName: course.name,
                  credit: 3,
                },
              ]
            : []),
        ],
      });
    if (path === '/graduations/credits')
      return send(200, [{ category: 'COMMON_CULTURE', totalCredit: 12, takenCredit: credit(), completed: false }]);
    return send(404, { message: `Unhandled synthetic endpoint: ${req.method} ${path}` });
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  return {
    url: `http://127.0.0.1:${server.address().port}`,
    snapshot,
    close: () =>
      new Promise((resolve) => {
        server.close(resolve);
        server.closeAllConnections();
      }),
  };
}
