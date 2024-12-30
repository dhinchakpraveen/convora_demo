export class RecordingService {
  async uploadRecording(blob: Blob): Promise<string> {
    const formData = new FormData();
    const filename = `recording-${Date.now()}.webm`;
    formData.append('file', blob, filename);

    const response = await fetch('http://localhost:8000/api/recordings/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.url;
  }

  async getRecording(id: string) {
    const response = await fetch(`http://localhost:8000/api/recordings/${id}`);
    return response.json();
  }
}