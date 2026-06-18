import { saveData, loadData, clearData } from './storage';

const STORAGE_KEY = 'pd-resource-mgmt-data';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('saveData and loadData', () => {
    it('should save and load data correctly', () => {
      const mockData = {
        designers: [{ id: '1', name: 'Test' }],
        portfolios: [{ id: 'p1', name: 'Test Portfolio' }],
        version: 1
      };

      saveData(mockData);
      const loaded = loadData();

      expect(loaded).toMatchObject(mockData);
      expect(loaded.lastSaved).toBeDefined();
    });

    it('should return null when no data exists', () => {
      const loaded = loadData();
      expect(loaded).toBeNull();
    });

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem(STORAGE_KEY, 'invalid json');
      const loaded = loadData();
      expect(loaded).toBeNull();
    });
  });

  describe('clearData', () => {
    it('should clear stored data', () => {
      const mockData = { test: 'data' };
      saveData(mockData);

      clearData();

      const loaded = loadData();
      expect(loaded).toBeNull();
    });
  });

  describe('exportToJSON', () => {
    it('should trigger download with correct filename', () => {
      // Mock document.createElement and click
      const mockLink = {
        href: '',
        download: '',
        click: jest.fn()
      };
      const mockAppendChild = jest.fn();
      const mockRemoveChild = jest.fn();

      jest.spyOn(document, 'createElement').mockReturnValue(mockLink);
      jest.spyOn(document.body, 'appendChild').mockImplementation(mockAppendChild);
      jest.spyOn(document.body, 'removeChild').mockImplementation(mockRemoveChild);

      global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
      global.URL.revokeObjectURL = jest.fn();

      const mockData = { test: 'data' };
      const { exportToJSON } = require('./storage');

      exportToJSON(mockData, 'test-export');

      expect(mockLink.download).toBe('test-export.json');
      expect(mockLink.click).toHaveBeenCalled();
      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  describe('importFromJSON', () => {
    it('should read and parse JSON file', async () => {
      const mockData = { test: 'data' };
      const file = new File(
        [JSON.stringify(mockData)],
        'test.json',
        { type: 'application/json' }
      );

      const { importFromJSON } = require('./storage');
      const result = await importFromJSON(file);

      expect(result).toEqual(mockData);
    });

    it('should reject invalid JSON', async () => {
      const file = new File(['invalid json'], 'test.json', { type: 'application/json' });

      const { importFromJSON } = require('./storage');

      await expect(importFromJSON(file)).rejects.toThrow();
    });
  });
});
