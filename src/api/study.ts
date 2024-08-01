import { StudyExport, StudyImport } from '../types'
export class Study {
  constructor(private readonly fetcher: Function) {}

  /// Export a single chapter.
  public async chapter({
    studyId,
    chapterId,
    clocks = true,
    comments = true,
    variations = true,
    source = false,
    orientation = false,
  }: StudyExport) {
    const params = new URLSearchParams({
      clocks: String(clocks),
      comments: String(comments),
      variations: String(variations),
      source: String(source),
      orientation: String(orientation),
    })
    const response = await this.fetcher(`/api/study/${studyId}/${chapterId}.pgn?${params}`, 'get', undefined, false)
    const text = await response.text()
    return text
  }

  /// Export all chapters of a study.
  public async chapters({
    studyId,
    clocks = true,
    comments = true,
    variations = true,
    source = false,
    orientation = false,
  }: StudyExport) {
    const params = new URLSearchParams({
      clocks: String(clocks),
      comments: String(comments),
      variations: String(variations),
      source: String(source),
      orientation: String(orientation),
    })
    const response = await this.fetcher(`/api/study/${studyId}.pgn?${params}`, 'get', undefined, false)
    const text = await response.text()
    return text
  }

  /// Export all studies of a user.
  public async studies({
    username,
    clocks = true,
    comments = true,
    variations = true,
    source = false,
    orientation = false,
  }: StudyExport) {
    const params = new URLSearchParams({
      clocks: String(clocks),
      comments: String(comments),
      variations: String(variations),
      source: String(source),
      orientation: String(orientation),
    })
    const response = await this.fetcher(
      `/study/by/${username}/export.pgn?${params}`,
      'get',
      undefined,
      false)
    const json = await response.json()
    return json
  }

  /// Retrieve only the study headers (metadata) of a study.
  public async meta({ studyId }: { studyId: string }) {
    const response = await this.fetcher(`/api/study/${studyId}.pgn`, 'head', undefined, false)
    const text = await response.text()
    return text
  }

  /// Import PGN into an existing study.
  public async import({
    studyId,
    name,
    pgn,
    orientation = 'white',
    variant = 'standard',
  }: StudyImport) {
    const params = new URLSearchParams({ name, pgn, orientation, variant })
    const response = await this.fetcher(
      `/api/study/${studyId}/import-pgn?${params}`,
      'post',
      undefined,
      false)
    const text = await response.text()
    return text
  }

  // The study list is defined on `User`.
}
