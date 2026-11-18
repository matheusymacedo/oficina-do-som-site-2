import test from 'node:test';
import assert from 'node:assert/strict';
import { getPageSeo, matchRoute, normalizePathname } from './routes';

test('normalizePathname strips trailing slash and query/hash fragments', () => {
  assert.equal(normalizePathname('/servicos/'), '/servicos');
  assert.equal(normalizePathname('/contato?ref=hero#form'), '/contato');
  assert.equal(normalizePathname('/'), '/');
});

test('matchRoute resolves all primary routes and falls back to not-found', () => {
  assert.equal(matchRoute('/'), 'home');
  assert.equal(matchRoute('/servicos'), 'services');
  assert.equal(matchRoute('/sobre'), 'about');
  assert.equal(matchRoute('/perguntas-frequentes'), 'faq');
  assert.equal(matchRoute('/contato'), 'contact');
  assert.equal(matchRoute('/galeria'), 'not-found');
  assert.equal(matchRoute('/rota-desconhecida'), 'not-found');
});

test('getPageSeo returns unique titles and descriptions per page', () => {
  const homeSeo = getPageSeo('home');
  const servicesSeo = getPageSeo('services');
  const faqSeo = getPageSeo('faq');
  const notFoundSeo = getPageSeo('not-found');

  assert.notEqual(homeSeo.title, servicesSeo.title);
  assert.ok(homeSeo.description.includes('Cruzeiro'));
  assert.ok(servicesSeo.title.includes('Mecânica Geral'));
  assert.ok(faqSeo.title.includes('Perguntas Frequentes'));
  assert.ok(notFoundSeo.title.includes('Página não encontrada'));
});
