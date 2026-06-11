import assert from 'node:assert/strict';
import test from 'node:test';
import worker from './index.mjs';

function createEnv() {
    const writes = [];
    return {
        writes,
        env: {
            ASSETS: {
                async put(key, body, options) {
                    writes.push({ key, body: await new Response(body).text(), options });
                },
            },
            ALLOWED_ORIGINS: 'https://fuenteviva.uy',
            MIGRATION_TOKEN: 'secret',
            PUBLIC_ASSET_URL: 'https://assets.example.com',
        },
    };
}

test('rejects unauthorized migration requests', async () => {
    const { env } = createEnv();
    const response = await worker.fetch(new Request('https://worker.example/migrate-local', {
        method: 'POST',
        body: 'asset',
        headers: { 'X-Object-Key': 'products/test.jpg' },
    }), env);

    assert.equal(response.status, 401);
});

test('stores authorized local migration files in R2', async () => {
    const { env, writes } = createEnv();
    const response = await worker.fetch(new Request('https://worker.example/migrate-local', {
        method: 'POST',
        body: 'asset',
        headers: {
            Authorization: 'Bearer secret',
            'Content-Type': 'image/jpeg',
            'X-Object-Key': 'products/test.jpg',
        },
    }), env);

    assert.equal(response.status, 200);
    assert.equal(writes[0].key, 'products/test.jpg');
    assert.equal(writes[0].body, 'asset');
    assert.equal((await response.json()).publicUrl, 'https://assets.example.com/products/test.jpg');
});
