import AppLayout from '@/layouts/app-layout';
import AppSettingsLayout from '@/layouts/settings/app-settings-layout';

export default function account() {
  return (
    <AppLayout title="App Settings">
      <AppSettingsLayout>
        <h1>Account Page</h1>
      </AppSettingsLayout>
    </AppLayout>
  );
}
