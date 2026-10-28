import type { Data } from './model';

export type RestoreDatabase = {
  withTransactionSync: (task: () => void) => void;
  getFirstSync: <T>(query: string) => T | null;
  runSync: (query: string, ...params: string[]) => unknown;
};
// Each operation is one transaction: a failed restore cannot leave a partial replacement.
export function replaceWithUndo(db: RestoreDatabase, next: Data, empty: Data): void {
  db.withTransactionSync(() => {
    const previous = db.getFirstSync<{ data: string }>('SELECT data FROM app_state WHERE id = 1');
    db.runSync('INSERT INTO app_state (id, data) VALUES (2, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data', previous?.data ?? JSON.stringify(empty));
    db.runSync('INSERT INTO app_state (id, data) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data', JSON.stringify(next));
  });
}
export function revertRestore(db: RestoreDatabase): Data {
  let previous: Data | undefined;
  db.withTransactionSync(() => {
    const row = db.getFirstSync<{ data: string }>('SELECT data FROM app_state WHERE id = 2');
    if (!row) throw new Error('No restore point available.');
    previous = JSON.parse(row.data) as Data;
    db.runSync('INSERT INTO app_state (id, data) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data', row.data);
    db.runSync('DELETE FROM app_state WHERE id = 2');
  });
  return previous!;
}
