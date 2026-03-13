/*! *****************************************************************************
Copyright 2022 JUST-EQ.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby denied.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
(() => {
  "use strict";
  var i = [
      ,
      (e, t, i) => {
        (i.r(t), i.d(t, { default: () => a }));
        var n = i(2),
          r = i(3);
        class a {
          constructor(e) {
            ((this[1024] = {
              binResolution: n.default.sampleRate / 1024,
              redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map:
                a.Get_RedactedBinFrequency_WidthPosition_FrequencyDataArrayIndex_Map(
                  e,
                  1024,
                ),
            }),
              (this[2048] = {
                binResolution: n.default.sampleRate / 2048,
                redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map:
                  a.Get_RedactedBinFrequency_WidthPosition_FrequencyDataArrayIndex_Map(
                    e,
                    2048,
                  ),
              }),
              (this[4096] = {
                binResolution: n.default.sampleRate / 4096,
                redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map:
                  a.Get_RedactedBinFrequency_WidthPosition_FrequencyDataArrayIndex_Map(
                    e,
                    4096,
                  ),
              }),
              (this[8192] = {
                binResolution: n.default.sampleRate / 8192,
                redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map:
                  a.Get_RedactedBinFrequency_WidthPosition_FrequencyDataArrayIndex_Map(
                    e,
                    8192,
                  ),
              }),
              (this[16384] = {
                binResolution: n.default.sampleRate / 16384,
                redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map:
                  a.Get_RedactedBinFrequency_WidthPosition_FrequencyDataArrayIndex_Map(
                    e,
                    16384,
                  ),
              }),
              (this[32768] = {
                binResolution: n.default.sampleRate / 32768,
                redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map:
                  a.Get_RedactedBinFrequency_WidthPosition_FrequencyDataArrayIndex_Map(
                    e,
                    32768,
                  ),
              }));
          }
          static GetBinFrequencies(e) {
            const t = n.default.sampleRate / e;
            return [...Array(e / 2).keys()].map((e) => (e + 1) * t);
          }
          static Get_BinFrequency_WidthPosition_Map(t, e) {
            return new Map(
              e.map((e) => [
                e,
                {
                  linear: r.default.FrequencyToWidthPosition(e, t, "linear"),
                  log: r.default.FrequencyToWidthPosition(e, t, "log"),
                },
              ]),
            );
          }
          static Get_RedactedBinFrequency_WidthPosition_FrequencyDataArrayIndex_Map(
            e,
            t,
          ) {
            const l = a.GetBinFrequencies(t);
            t = a.Get_BinFrequency_WidthPosition_Map(e, l);
            const c = { linear: new Map(), log: new Map() };
            return (
              Array.from(t).forEach(([r, a], s, o) => {
                ["linear", "log"].forEach((e) => {
                  let t;
                  t =
                    0 < s
                      ? (([, n] = o[s - 1]), Math.abs(n[e] - Math.round(a[e])))
                      : 1;
                  let i;
                  i =
                    s < o.length - 1
                      ? (([, n] = o[s + 1]), Math.abs(n[e] - Math.round(a[e])))
                      : 1;
                  var n = Math.abs(a[e] - Math.round(a[e]));
                  n < t &&
                    n < i &&
                    ((n = l.indexOf(r)),
                    c[e].set(r, {
                      widthPosition: a[e],
                      frequencyDataArrayIndex: n,
                    }));
                });
              }),
              c
            );
          }
        }
      },
      (e, t, i) => {
        (i.r(t), i.d(t, { default: () => a }));
        class a {
          constructor(e, t, i) {
            ((this.filtersBypassState = [...Array(5)].map(() => !1)),
              (this.filtersAllBypassState = !1),
              (this.resetFrequencyWidthPositions =
                a.GetResetFrequencyWidthPositions(e)),
              (this.filtersState = a.GetResetFiltersState(e, t)),
              (this.audioContext = new AudioContext({
                latencyHint: "playback",
                sampleRate: a.sampleRate,
              })),
              (this.preAnalyser = new AnalyserNode(this.audioContext, {
                maxDecibels: 0,
              })),
              (this.postAnalyser = new AnalyserNode(this.audioContext, {
                maxDecibels: 0,
              })),
              (this.filters = [...Array(5).keys()].map(
                (e) =>
                  new BiquadFilterNode(
                    this.audioContext,
                    this.filtersState[i][e],
                  ),
              )),
              (this.filtersPreGains = [...Array(5)].map(
                () => new GainNode(this.audioContext, { gain: 1 }),
              )),
              (this.filtersBypassGains = [...Array(5)].map(
                () => new GainNode(this.audioContext, { gain: 0 }),
              )),
              (this.filtersAllBypassGain = new GainNode(this.audioContext, {
                gain: 0,
              })),
              (this.postGain = new GainNode(this.audioContext, { gain: 1 })));
          }
          static GetResetFrequencyWidthPositions(t) {
            return [1, 2, 3, 4, 5].map((e) => (t / 6) * e);
          }
          static GetResetFiltersState(e, n) {
            const t = a.GetResetFrequencyWidthPositions(e),
              r = { linear: [...Array(5)], log: [...Array(5)] };
            return (
              ["linear", "log"].forEach((i) => {
                t.forEach((e, t) => {
                  r[i][t] = {
                    frequency: n[i].widthPosition_frequency_map.get(e),
                    type: "peaking",
                    gain: 0,
                    Q: 1,
                  };
                });
              }),
              r
            );
          }
          async initalizeAudio(e) {
            await this.audioContext.audioWorklet.addModule(
              "../wasm/limiter.wasmmodule.js",
            );
            this.limiter = new AudioWorkletNode(
              this.audioContext,
              "wasm-worklet-processor",
              { processorOptions: { sampleRate: a.sampleRate } },
            );
            this.audioStream = new MediaStreamAudioSourceNode(
              this.audioContext,
              { mediaStream: e },
            );

            // --- MULAI SISTEM STEREO (L & R) ---
            this.splitter = this.audioContext.createChannelSplitter(2);
            this.merger = this.audioContext.createChannelMerger(2);
            this.audioStream.connect(this.splitter);

            // Duplikasi pengaturan filter untuk channel KANAN
            this.filtersR = [...Array(5).keys()].map((idx) => {
              let node = new BiquadFilterNode(this.audioContext);
              node.type = this.filters[idx].type;
              node.frequency.value = this.filters[idx].frequency.value;
              node.Q.value = this.filters[idx].Q.value;
              node.gain.value = this.filters[idx].gain.value;
              return node;
            });

            for (let e = 0; e < this.filters.length; e += 1) {
              if (e === 0) {
                // Sambungan Awal (Analisa dan Bypass)
                this.splitter.connect(this.preAnalyser, 0);
                this.splitter.connect(this.filtersAllBypassGain, 0);
                this.filtersAllBypassGain.connect(this.postGain);

                // KIRI (Channel 0) masuk ke Filter Kiri
                this.splitter.connect(this.filtersPreGains[e], 0);
                this.filtersPreGains[e].connect(this.filters[e]);
                this.splitter.connect(this.filtersBypassGains[e], 0);

                // KANAN (Channel 1) masuk ke Filter Kanan
                this.splitter.connect(this.filtersR[e], 1);
              }

              if (e !== this.filters.length - 1) {
                // Rantai Filter KIRI
                this.filters[e].connect(this.filtersPreGains[e + 1]);
                this.filtersPreGains[e + 1].connect(this.filters[e + 1]);
                this.filters[e].connect(this.filtersBypassGains[e + 1]);
                this.filtersBypassGains[e].connect(this.filtersPreGains[e + 1]);
                this.filtersBypassGains[e].connect(
                  this.filtersBypassGains[e + 1],
                );

                // Rantai Filter KANAN
                this.filtersR[e].connect(this.filtersR[e + 1]);
              } else {
                // Ujung Rantai: Satukan Kiri & Kanan di Merger
                this.filters[e].connect(this.merger, 0, 0); // Kiri ke slot 0
                this.filtersBypassGains[e].connect(this.merger, 0, 0);
                this.filtersR[e].connect(this.merger, 0, 1); // Kanan ke slot 1

                // Merger jalan ke Output Suara
                this.merger.connect(this.postGain);
                this.postGain.connect(this.limiter);
                this.limiter.connect(this.postAnalyser);
                this.limiter.connect(this.audioContext.destination);
              }
            }
          }
          updateAnalyserSettings(e) {
            var { minDecibels: e, fftSize: t, smoothingTimeConstant: i } = e;
            (void 0 !== e &&
              ((this.preAnalyser.minDecibels = e),
              (this.postAnalyser.minDecibels = e)),
              void 0 !== t &&
                ((this.preAnalyser.fftSize = t),
                (this.postAnalyser.fftSize = t)),
              void 0 !== i &&
                ((this.preAnalyser.smoothingTimeConstant = i),
                (this.postAnalyser.smoothingTimeConstant = i)));
          }
          updateFilterParameters(e, t, i) {
            var { frequency: freq, Q: q, gain: g, type: tp } = i;
            window.channelMode = window.channelMode || "LINK";

            const setNode = (node) => {
              if (!node) return;
              if (freq !== undefined)
                node.frequency.setTargetAtTime(
                  freq,
                  this.audioContext.currentTime,
                  0.001,
                );
              if (q !== undefined)
                node.Q.setTargetAtTime(q, this.audioContext.currentTime, 0.001);
              if (g !== undefined)
                node.gain.setTargetAtTime(
                  g,
                  this.audioContext.currentTime,
                  0.001,
                );
              if (tp !== undefined) {
                if (["lowshelf", "highshelf", "peaking"].includes(node.type)) {
                  node.gain.setTargetAtTime(
                    0,
                    this.audioContext.currentTime,
                    0.001,
                  );
                }
                if (!["lowshelf", "highshelf"].includes(node.type)) {
                  node.Q.setTargetAtTime(
                    1,
                    this.audioContext.currentTime,
                    0.001,
                  );
                }
                node.type = tp;
              }
            };

            // Update UI State (Grafik)
            if (freq !== undefined) this.filtersState[t][e].frequency = freq;
            if (q !== undefined) this.filtersState[t][e].Q = q;
            if (g !== undefined) this.filtersState[t][e].gain = g;
            if (tp !== undefined) this.filtersState[t][e].type = tp;

            // Terapkan ke Audio L/R/Keduanya
            if (window.channelMode === "KIRI" || window.channelMode === "LINK")
              setNode(this.filters[e]);
            if (window.channelMode === "KANAN" || window.channelMode === "LINK")
              setNode(this.filtersR ? this.filtersR[e] : null);
          }

          switchAllFiltersState(a) {
            this.filters.forEach((e, t) => {
              var {
                frequency: freq,
                gain: g,
                Q: q,
                type: tp,
              } = this.filtersState[a][t];
              if (
                freq !== undefined &&
                g !== undefined &&
                q !== undefined &&
                tp !== undefined
              ) {
                e.frequency.setTargetAtTime(
                  freq,
                  this.audioContext.currentTime,
                  0.001,
                );
                e.Q.setTargetAtTime(q, this.audioContext.currentTime, 0.001);
                e.gain.setTargetAtTime(g, this.audioContext.currentTime, 0.001);
                e.type = tp;

                if (this.filtersR && this.filtersR[t]) {
                  this.filtersR[t].frequency.setTargetAtTime(
                    freq,
                    this.audioContext.currentTime,
                    0.001,
                  );
                  this.filtersR[t].Q.setTargetAtTime(
                    q,
                    this.audioContext.currentTime,
                    0.001,
                  );
                  this.filtersR[t].gain.setTargetAtTime(
                    g,
                    this.audioContext.currentTime,
                    0.001,
                  );
                  this.filtersR[t].type = tp;
                }
              }
            });
          }
          toggleFilterBypassState(e) {
            ((this.filtersBypassState[e] = !this.filtersBypassState[e]),
              (this.filtersBypassState[e]
                ? (this.filtersPreGains[e].gain.setTargetAtTime(
                    0,
                    this.audioContext.currentTime,
                    0.001,
                  ),
                  this.filtersBypassGains)
                : (this.filtersBypassGains[e].gain.setTargetAtTime(
                    0,
                    this.audioContext.currentTime,
                    0.001,
                  ),
                  this.filtersPreGains))[e].gain.setTargetAtTime(
                1,
                this.audioContext.currentTime + 0.002,
                0.001,
              ));
          }
          toggleAllFiltersBypassState() {
            if (
              ((this.filtersAllBypassState = !this.filtersAllBypassState),
              this.filtersAllBypassState)
            ) {
              for (let e = 0; e < this.filters.length; e += 1)
                (this.filtersPreGains[e].gain.setTargetAtTime(
                  0,
                  this.audioContext.currentTime,
                  0.001,
                ),
                  this.filtersBypassGains[e].gain.setTargetAtTime(
                    0,
                    this.audioContext.currentTime,
                    0.001,
                  ));
              this.filtersAllBypassGain.gain.setTargetAtTime(
                1,
                this.audioContext.currentTime + 0.002,
                0.001,
              );
            } else
              (this.filtersAllBypassGain.gain.setTargetAtTime(
                0,
                this.audioContext.currentTime,
                0.001,
              ),
                this.filtersBypassState.forEach((e, t) => {
                  (e
                    ? (this.filtersPreGains[t].gain.setTargetAtTime(
                        0,
                        this.audioContext.currentTime,
                        0.001,
                      ),
                      this.filtersBypassGains)
                    : (this.filtersBypassGains[t].gain.setTargetAtTime(
                        0,
                        this.audioContext.currentTime,
                        0.001,
                      ),
                      this.filtersPreGains))[t].gain.setTargetAtTime(
                    1,
                    this.audioContext.currentTime + 0.002,
                    0.001,
                  );
                }));
          }
        }
        ((a.sampleRate = 72e3), (a.samplePeriod = 1 / a.sampleRate));
      },
      (e, t, i) => {
        (i.r(t), i.d(t, { default: () => r }));
        class r {
          constructor(e) {
            ((this.linear = {
              frequency_widthPosition_map: r.Get_Frequency_WidthPosition_Map(
                e,
                "linear",
              ),
              widthPosition_frequency_map: r.Get_WidthPosition_Frequency_Map(
                e,
                "linear",
              ),
              lineFrequency_widthPositionString_map:
                r.Get_LineFrequency_WidthPositionString_Map(e, "linear"),
            }),
              (this.log = {
                frequency_widthPosition_map: r.Get_Frequency_WidthPosition_Map(
                  e,
                  "log",
                ),
                widthPosition_frequency_map: r.Get_WidthPosition_Frequency_Map(
                  e,
                  "log",
                ),
                lineFrequency_widthPositionString_map:
                  r.Get_LineFrequency_WidthPositionString_Map(e, "log"),
              }));
          }
          static WidthPositionToFrequency(e, t, i) {
            t = (r[i + "_frequencyRange"] / t) * e + r[i + "_minFrequency"];
            return "linear" === i ? t : 10 ** t;
          }
          static FrequencyToWidthPosition(e, t, i) {
            t /= r[i + "_frequencyRange"];
            return "linear" === i
              ? t * (e - r.linear_minFrequency)
              : t * (Math.log10(e < 1 ? 1 : e) - r.log_minFrequency);
          }
          static Get_WidthPosition_Frequency_Map(t, i) {
            return new Map(
              [...Array(t + 1).keys()].map((e) => [
                e,
                r.WidthPositionToFrequency(e, t, i),
              ]),
            );
          }
          static Get_Frequency_WidthPosition_Map(t, i) {
            return new Map(
              [0, 10, 1e3, 2e4, 24e3, 3e4].map((e) => [
                e,
                r.FrequencyToWidthPosition(e, t, i),
              ]),
            );
          }
          static Get_LineFrequency_WidthPositionString_Map(i, n) {
            return new Map(
              r[n + "_lineFrequencies"].map((e, t) => [
                e,
                {
                  widthPosition: r.FrequencyToWidthPosition(e, i, n),
                  string: r[n + "_lineFrequenciesString"][t],
                },
              ]),
            );
          }
        }
        ((r.linear_lineFrequencies = [
          1e3, 2e3, 3e3, 4e3, 5e3, 6e3, 7e3, 8e3, 9e3, 1e4, 11e3, 12e3, 13e3,
          14e3, 15e3, 16e3, 17e3, 18e3, 19e3, 2e4, 21e3, 22e3, 23e3, 24e3,
        ]),
          (r.linear_lineFrequenciesString = [
            "1k",
            "2k",
            "3k",
            "4k",
            "5k",
            "6k",
            "7k",
            "8k",
            "9k",
            "10k",
            "11k",
            "12k",
            "13k",
            "14k",
            "15k",
            "16k",
            "17k",
            "18k",
            "19k",
            "20k",
            "21k",
            "22k",
            "23k",
            "24k",
          ]),
          (r.linear_maxFrequency = 25e3),
          (r.linear_minFrequency = 9),
          (r.linear_frequencyRange =
            r.linear_maxFrequency - r.linear_minFrequency),
          (r.linear_maxFrequencyInput = 24e3),
          (r.linear_minFrequencyInput = 1e3),
          (r.log_lineFrequencies = [
            10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600,
            700, 800, 900, 1e3, 2e3, 3e3, 4e3, 5e3, 6e3, 7e3, 8e3, 9e3, 1e4,
            2e4,
          ]),
          (r.log_lineFrequenciesString = [
            "10",
            "20",
            "",
            "",
            "50",
            "",
            "",
            "",
            "",
            "100",
            "200",
            "",
            "",
            "500",
            "",
            "",
            "",
            "",
            "1k",
            "2k",
            "",
            "",
            "5k",
            "",
            "",
            "",
            "",
            "10k",
            "20k",
          ]),
          (r.log_maxFrequency = Math.log10(33e3)),
          (r.log_minFrequency = Math.log10(7)),
          (r.log_frequencyRange = r.log_maxFrequency - r.log_minFrequency),
          (r.log_maxFrequencyInput = 2e4),
          (r.log_minFrequencyInput = 10));
      },
      (e, t, i) => {
        (i.r(t), i.d(t, { default: () => r }));
        class r {
          constructor(e) {
            ((this[60] = {
              heightPosition_decibel_map: r.Get_HeightPosition_Decibel_Map(
                e,
                60,
              ),
              lineDecibel_heightPositionString_map:
                r.Get_LineDecibel_HeightPositionString_Map(e, 60),
            }),
              (this[90] = {
                heightPosition_decibel_map: r.Get_HeightPosition_Decibel_Map(
                  e,
                  90,
                ),
                lineDecibel_heightPositionString_map:
                  r.Get_LineDecibel_HeightPositionString_Map(e, 90),
              }),
              (this[120] = {
                heightPosition_decibel_map: r.Get_HeightPosition_Decibel_Map(
                  e,
                  120,
                ),
                lineDecibel_heightPositionString_map:
                  r.Get_LineDecibel_HeightPositionString_Map(e, 120),
              }));
          }
          static HeightPositionToDecibel(e, t, i) {
            return (r["decibelRange_" + i] / -t) * e + r["maxDecibel_" + i];
          }
          static DecibelToHeightPosition(e, t, i) {
            return (
              (-t / r["decibelRange_" + i]) * (e - r["minDecibel_" + i]) + t
            );
          }
          static Get_HeightPosition_Decibel_Map(t, i) {
            return new Map(
              [...Array(t + 1).keys()].map((e) => [
                e,
                r.HeightPositionToDecibel(e, t, i),
              ]),
            );
          }
          static Get_LineDecibel_HeightPositionString_Map(i, n) {
            return new Map(
              r["lineDecibels_" + n].map((e, t) => [
                e,
                {
                  heightPosition: r.DecibelToHeightPosition(e, i, n),
                  string: r["lineDecibelsString_" + n][t],
                },
              ]),
            );
          }
        }
        ((r.lineDecibels_60 = [
          0, -5, -10, -15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -65,
        ]),
          (r.lineDecibelsString_60 = [
            "0",
            "-5",
            "-10",
            "-15",
            "-20",
            "-25",
            "-30",
            "-35",
            "-40",
            "-45",
            "-50",
            "-55",
            "-60",
            "-65",
          ]),
          (r.minDecibel_60 = -70),
          (r.maxDecibel_60 = 4),
          (r.decibelRange_60 = r.maxDecibel_60 - r.minDecibel_60),
          (r.lineDecibels_90 = [
            0, -10, -20, -30, -40, -50, -60, -70, -80, -90, -100,
          ]),
          (r.lineDecibelsString_90 = [
            "0",
            "-10",
            "-20",
            "-30",
            "-40",
            "-50",
            "-60",
            "-70",
            "-80",
            "-90",
            "-100",
          ]),
          (r.minDecibel_90 = -110),
          (r.maxDecibel_90 = 6),
          (r.decibelRange_90 = r.maxDecibel_90 - r.minDecibel_90),
          (r.lineDecibels_120 = [
            0, -10, -20, -30, -40, -50, -60, -70, -80, -90, -100, -110, -120,
            -130,
          ]),
          (r.lineDecibelsString_120 = [
            "0",
            "-10",
            "-20",
            "-30",
            "-40",
            "-50",
            "-60",
            "-70",
            "-80",
            "-90",
            "-100",
            "-110",
            "-120",
            "-130",
          ]),
          (r.minDecibel_120 = -140),
          (r.maxDecibel_120 = 7),
          (r.decibelRange_120 = r.maxDecibel_120 - r.minDecibel_120));
      },
      (e, t, i) => {
        (i.r(t), i.d(t, { default: () => r }));
        class r {
          constructor(e) {
            ((this[10] = {
              decibelGainStep: r.Get_DecibelGainStep(e, 10),
              heightPosition_decibelGain_map:
                r.Get_HeightPosition_DecibelGain_Map(e, 10),
              lineDecibelGain_heightPositionString_map:
                r.Get_LineDecibelGain_HeightPositionString_Map(e, 10),
            }),
              (this[20] = {
                decibelGainStep: r.Get_DecibelGainStep(e, 20),
                heightPosition_decibelGain_map:
                  r.Get_HeightPosition_DecibelGain_Map(e, 20),
                lineDecibelGain_heightPositionString_map:
                  r.Get_LineDecibelGain_HeightPositionString_Map(e, 20),
              }),
              (this[40] = {
                decibelGainStep: r.Get_DecibelGainStep(e, 40),
                heightPosition_decibelGain_map:
                  r.Get_HeightPosition_DecibelGain_Map(e, 40),
                lineDecibelGain_heightPositionString_map:
                  r.Get_LineDecibelGain_HeightPositionString_Map(e, 40),
              }));
          }
          static HeightPositionToDecibelGain(e, t, i) {
            return (
              (this["decibelGainRange_" + i] / -t) * e +
              this["maxDecibelGain_" + i]
            );
          }
          static DecibelGainToHeightPosition(e, t, i) {
            return (-t / this["decibelGainRange_" + i]) * e + t / 2;
          }
          static MagnitudeGainToHeightPosition(e, t, i) {
            e = 20 * Math.log10(0 === e ? 1e-4 : e);
            return this.DecibelGainToHeightPosition(e, t, i);
          }
          static Get_DecibelGainStep(e, t) {
            return r["decibelGainRange_" + t] / e;
          }
          static Get_HeightPosition_DecibelGain_Map(t, i) {
            return new Map(
              [...Array(t + 1).keys()].map((e) => [
                e,
                r.HeightPositionToDecibelGain(e, t, i),
              ]),
            );
          }
          static Get_LineDecibelGain_HeightPositionString_Map(i, n) {
            return new Map(
              r["lineDecibelGains_" + n].map((e, t) => [
                e,
                {
                  heightPosition: r.DecibelGainToHeightPosition(e, i, n),
                  string: r["lineDecibelGainsString_" + n][t],
                },
              ]),
            );
          }
        }
        ((r.lineDecibelGains_10 = [10, 6, 2, -2, -6, -10]),
          (r.lineDecibelGainsString_10 = [
            "+10",
            "+6",
            "+2",
            "-2",
            "-6",
            "-10",
          ]),
          (r.maxDecibelGain_10 = 11),
          (r.minDecibelGain_10 = -11),
          (r.decibelGainRange_10 = r.maxDecibelGain_10 - r.minDecibelGain_10),
          (r.maxDecibelGainInput_10 = 10),
          (r.minDecibelGainInput_10 = -10),
          (r.lineDecibelGains_20 = [20, 12, 4, -4, -12, -20]),
          (r.lineDecibelGainsString_20 = [
            "+20",
            "+12",
            "+4",
            "-4",
            "-12",
            "-20",
          ]),
          (r.maxDecibelGain_20 = 22),
          (r.minDecibelGain_20 = -22),
          (r.decibelGainRange_20 = r.maxDecibelGain_20 - r.minDecibelGain_20),
          (r.maxDecibelGainInput_20 = 20),
          (r.minDecibelGainInput_20 = -20),
          (r.lineDecibelGains_40 = [40, 24, 8, -8, -24, -40]),
          (r.lineDecibelGainsString_40 = [
            "+40",
            "+24",
            "+8",
            "-8",
            "-24",
            "-40",
          ]),
          (r.maxDecibelGain_40 = 44),
          (r.minDecibelGain_40 = -44),
          (r.decibelGainRange_40 = r.maxDecibelGain_40 - r.minDecibelGain_40),
          (r.maxDecibelGainInput_40 = 40),
          (r.minDecibelGainInput_40 = -40),
          (r.maxQ = 40),
          (r.minQ = 1e-4),
          (r.qRange = r.maxQ - r.minQ));
      },
    ],
    n = {};
  function v(e) {
    var t = n[e];
    return (
      void 0 !== t || ((t = n[e] = { exports: {} }), i[e](t, t.exports, v)),
      t.exports
    );
  }
  ((v.m = i),
    (v.d = (e, t) => {
      for (var i in t)
        v.o(t, i) &&
          !v.o(e, i) &&
          Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
    }),
    (v.u = (e) => "popup/" + e + ".popup.js"),
    (v.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (v.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (v.r = (e) => {
      ("undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 }));
    }),
    v.g.importScripts && (M = v.g.location + ""));
  var k = v.g.document;
  if (
    (M ||
      !k ||
      (M = k.currentScript ? k.currentScript.src : M) ||
      ((k = k.getElementsByTagName("script")).length &&
        (M = k[k.length - 1].src)),
    !M)
  )
    throw new Error("Automatic publicPath is not supported in this browser");
  ((M = M.replace(/#.*$/, "")
    .replace(/\?.*$/, "")
    .replace(/\/[^\/]+$/, "/")),
    (v.p = M + "../"),
    (v.b = document.baseURI || self.location.href));
  k = {};
  {
    v.r(k);
    var M = v(1),
      B = v(3),
      k = v(4),
      C = v(5),
      ye = v(2);
    const z = 750,
      L = 300;
    var R = "#F7FFF7";
    const $ = "#ffe66d",
      me = "#B2D3DC";
    var de = "#969A96";
    window.resizeTo(786, 525);
    const _e = document.querySelector("head > title"),
      O =
        (document.body.style.setProperty("background-color", "#2F3061"),
        document.querySelector("header").style.setProperty("color", R),
        document.querySelector("div#analyser")),
      j =
        (O.style.setProperty("width", z + "px"),
        O.style.setProperty("height", L + "px"),
        O.style.setProperty("border-color", R),
        document.querySelector("svg#analyser-svg")),
      be =
        (j.setAttribute("width", z.toString()),
        j.setAttribute("height", L.toString()),
        j.querySelector("path#axis-lines")),
      Y = j.querySelector("path#pre-filter"),
      U =
        (Y.setAttribute("stroke", R),
        Y.setAttribute("fill", de),
        j.querySelector("path#post-filter")),
      qe =
        (U.setAttribute("stroke", R),
        U.setAttribute("fill", de),
        j.querySelector("path#max-peak")),
      Ae = (qe.setAttribute("stroke", $), j.querySelector("text#axis-text")),
      J = j.querySelector("path#filter-axis-lines"),
      X =
        (J.setAttribute("stroke", $), j.querySelector("text#filter-axis-text")),
      K = (X.setAttribute("fill", $), j.querySelector("#hover-frequency")),
      Pe = document.querySelector('select[name="decibel-gain-range"]'),
      Se = document.querySelector('select[name="fft-size"]'),
      Ge = document.querySelector('select[name="frequency-scale"]'),
      Fe = document.querySelector('select[name="decibel-range"]'),
      xe = document.querySelector('input[name="smoothing-time-constant"]'),
      De = document.querySelector("#toggle-pre-analyser"),
      we = document.querySelector("#toggle-post-analyser");
    (De.style.setProperty("background-color", $),
      we.style.setProperty("background-color", $));
    let c = parseInt(Pe.value, 10),
      t = parseInt(Fe.value, 10),
      u = Ge.value,
      i = Number.parseInt(Se.value, 10),
      n = Number.parseFloat(xe.value);
    const Te = new B.default(z),
      V = new M.default(z),
      ve = new k.default(L),
      ke = new C.default(L),
      Z = new ye.default(z, Te, u);
    let {
        widthPosition_frequency_map: p,
        frequency_widthPosition_map: y,
        lineFrequency_widthPositionString_map: r,
      } = Te[u],
      { decibelGainStep: d, lineDecibelGain_heightPositionString_map: a } =
        ke[c],
      s = ve[t]["lineDecibel_heightPositionString_map"],
      o =
        V[i]["redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map"];
    function I() {
      (Ae.replaceChildren(),
        be.setAttribute("d", ""),
        s.forEach(({ heightPosition: e, string: t }, i) => {
          const n = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "tspan",
          );
          ((n.textContent = t),
            Ae.append(n),
            n.setAttribute("text-anchor", "end"),
            n.setAttribute("dominant-baseline", "hanging"),
            n.setAttribute("x", "" + (z - 0.005 * z)),
            n.setAttribute("y", "" + (e + 0.005 * L)));
        }),
        r.forEach(({ widthPosition: e, string: t }, i) => {
          const n = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "tspan",
          );
          ((n.textContent = t),
            Ae.append(n),
            n.setAttribute("dominant-baseline", "hanging"),
            n.setAttribute("x", "" + (e + 0.0025 * z)),
            n.setAttribute("y", "" + (0 + 0.005 * L)));
        }));
      var e = (function () {
          let n = "";
          return (
            s.forEach(({ heightPosition: e }, t) => {
              var i = `M 0 ${e} `,
                e = `L ${z} ${e} `;
              n += i + e;
            }),
            n
          );
        })(),
        t = (function () {
          let n = "";
          return (
            r.forEach(({ widthPosition: e }, t) => {
              var i = `M ${e} 0`,
                e = `L ${e} ${L} `;
              n += i + e;
            }),
            n
          );
        })();
      (be.setAttribute("d", e + " " + t),
        X.replaceChildren(),
        a.forEach(({ heightPosition: e, string: t }, i) => {
          const n = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "tspan",
          );
          ((n.textContent = t),
            X.append(n),
            n.setAttribute("text-anchor", "start"),
            n.setAttribute("x", "" + 0.0025 * z),
            0 < i
              ? (n.setAttribute("dominant-baseline", "hanging"),
                n.setAttribute("y", "" + (e + 0.005 * L)))
              : n.setAttribute("y", "" + (e - 0.0075 * L)));
        }));
      {
        J.setAttribute("d", "");
        let n = "";
        (a.forEach(({ heightPosition: e }, t) => {
          var i = `M 0 ${e} `,
            e = `L ${0.025 * z} ${e} `;
          n += i + e;
        }),
          J.setAttribute("d", "" + n));
      }
    }
    I();
    const Me = j.querySelector("g#filter-curves"),
      Be = j.querySelectorAll("path.filter-curve"),
      Ce = j.querySelector("path#filter-sum-curve");
    (Be.forEach((e) => {
      e.setAttribute("stroke", me);
    }),
      Ce.setAttribute("stroke", $));
    let l = Float32Array.from(p.values());
    const ee = new Float32Array(p.size),
      Re = new Float32Array(p.size),
      te = new Float32Array(p.size).fill(1);
    function he(e, t) {
      e.setAttribute("d", "");
      let i = "";
      (t.forEach((e, t) => {
        Number.isNaN(e) ||
          ((e = C.default.MagnitudeGainToHeightPosition(e, L, c)),
          (i += `${0 === t ? "M" : "L"} ${t} ${e} `));
      }),
        e.setAttribute("d", i));
    }
    function H(e) {
      e.forEach((e, t) => {
        e.getFrequencyResponse(l, ee, Re);
        const i = Be[t];
        ["lowpass", "highpass", "bandpass", "notch"].includes(e.type) ||
        0 < Math.abs(e.gain.value)
          ? he(i, ee)
          : i.setAttribute("d", "");
      });
    }
    function W(e) {
      (te.fill(1),
        Z.filtersAllBypassState ||
          e.forEach((e, t) => {
            Z.filtersBypassState[t] ||
              (e.getFrequencyResponse(l, ee, Re),
              te.forEach((e, t) => {
                Number.isNaN(ee[t]) || (te[t] *= ee[t]);
              }));
          }),
        he(Ce, te));
    }
    const Ie = j.querySelector("#unselect-filter"),
      ie = j.querySelectorAll("#filter-circle-group circle"),
      He = j.querySelector("#filter-circles-group"),
      ne = j.querySelectorAll("#filter-circle-highlight-group circle"),
      We = j.querySelectorAll("text.filter-circle-text"),
      Qe = j.querySelector("g#filter-circle-texts");
    for (let e = 0; e < ie.length; e += 1)
      (ne[e].setAttribute("r", "" + 0.024 * L),
        ie[e].setAttribute("r", "" + 0.015 * L),
        ie[e].setAttribute("fill", me),
        ne[e].setAttribute("display", "none"));
    const Ee = new Float32Array(1),
      Ne = new Float32Array(1),
      ze = new Float32Array(1);
    function Q(e, t, i) {
      const n = ie[e],
        r = ne[e],
        a = We[e],
        s = Z.filters[e];
      let o = parseInt(n.getAttribute("cx"), 10),
        l = parseInt(n.getAttribute("cy"), 10);
      (["filterGainRange", "filterType", "filterGain"].includes(t) ||
        ("reset" === t
          ? (o = Z.resetFrequencyWidthPositions[e])
          : ["filterFrequency", "frequencyScale"].includes(t)
            ? (o = B.default.FrequencyToWidthPosition(i.frequency, z, u))
            : "mousemove" === t && (o = i.widthPosition),
        n.setAttribute("cx", "" + o),
        r.setAttribute("cx", "" + o),
        a.setAttribute("x", o + " ")),
        (Ee[0] = s.frequency.value),
        [
          "filterGainRange",
          "filterFrequency",
          "filterQ",
          "filterGain",
          "mousemove",
          "filterType",
          "frequencyScale",
        ].includes(t) && s.getFrequencyResponse(Ee, Ne, ze),
        "notch" === s.type || "reset" === t
          ? (l = L / 2)
          : [
              "filterGainRange",
              "filterFrequency",
              "filterQ",
              "filterGain",
              "filterType",
              "mousemove",
              "frequencyScale",
            ].includes(t) &&
            (l = C.default.MagnitudeGainToHeightPosition(Ne[0], L, c)),
        n.setAttribute("cy", "" + l),
        r.setAttribute("cy", "" + l));
      e = n.getBBox().height;
      a.setAttribute("y", l - e + " ");
    }
    const Le = document.querySelector("button#filter-previous"),
      $e = document.querySelector("button#filter-next"),
      Oe = document.querySelector('select[name="filter-type"]'),
      re = document.querySelector('input[name="filter-frequency"]'),
      ae = document.querySelector('input[name="filter-q"]'),
      se = document.querySelector('input[name="filter-gain"]'),
      je = document.querySelector("button#filter-reset"),
      Ye = document.querySelector('label[for="filter-q"]'),
      Ue = document.querySelector('output[name="filter-number"]'),
      Je = document.querySelector("button#filter-bypass"),
      Xe = document.querySelector("div#active-filter-setting");
    function E(e, t) {
      var i = ["lowshelf", "highshelf"].includes(e.type),
        n = ["lowpass", "highpass"].includes(e.type) ? "Q (dB)" : "Q (linear)",
        i =
          (ae.toggleAttribute("disabled", i),
          (ae.value = i ? "" : e.Q.value.toString()),
          (Ye.textContent = i ? "Q" : n),
          !["lowshelf", "highshelf", "peaking"].includes(e.type));
      (se.toggleAttribute("disabled", i),
        (se.value = i ? "" : "" + e.gain.value),
        (Oe.value = e.type),
        (re.value = "" + e.frequency.value),
        (Ue.value = "" + (t + 1)),
        Z.filtersBypassState[t]
          ? Je.style.setProperty("background-color", $)
          : Je.style.removeProperty("background-color"));
    }
    (Xe.style.setProperty("display", "none"),
      re.setAttribute("max", "" + B.default[u + "_maxFrequencyInput"]),
      re.setAttribute("min", "" + B.default[u + "_minFrequencyInput"]),
      se.setAttribute("max", "" + C.default.maxDecibelGainInput_40),
      se.setAttribute("min", "" + C.default.minDecibelGainInput_40),
      ae.setAttribute("max", "" + C.default.maxQ),
      ae.setAttribute("min", "" + C.default.minQ));
    const oe = document.querySelectorAll("#select-filter-setting > button"),
      Ke = document.querySelector("#toggle-max-peak"),
      Ve = document.querySelector("#toggle-pause"),
      Ze = document.querySelector("#reset-filters"),
      et = document.querySelector("#toggle-all-bypass"),
      tt = document.querySelector("#open-support-donation"),
      le = document.querySelector("#support-donation"),
      it = document.querySelector("#close-support-donation"),
      nt = document.querySelector("#stripe"),
      rt = document.querySelector("#liberapay"),
      at = document.querySelector("#cashapp"),
      st = document.querySelector("#google-group"),
      ce = document.querySelector("#main-display"),
      ot =
        (le.style.setProperty("display", "none"),
        document.querySelector('output[name="bin-resolution"]')),
      lt = document.querySelector('output[name="sample-rate"]');
    ((ot.textContent = V[i].binResolution.toFixed(4) + " Hz/Bin"),
      (lt.textContent = ye.default.sampleRate / 1e3 + " kHz"));
    let h = y.get(3e4),
      f = y.get(0),
      g = !0,
      m = !0,
      _ = !1,
      e = !1,
      b,
      q,
      A = new Float32Array(o[u].size).fill(-1e3);
    const ue = new Worker(new URL(v.p + v.u(2), v.b)),
      pe =
        ((ue.onmessage = (e) => {
          (Y.setAttribute("d", e.data.preFilterDrawPath),
            U.setAttribute("d", e.data.postFilterDrawPath),
            qe.setAttribute("d", e.data.maxPeakDrawPath),
            Z.preAnalyser.getFloatFrequencyData(b),
            Z.postAnalyser.getFloatFrequencyData(q),
            ue.postMessage({
              preFrequencyDataArray: b,
              postFrequencyDataArray: q,
            }));
        }),
        chrome.tabCapture.capture({ audio: !0, video: !1 }, async (e) => {
          if (null == e) throw new Error("MediaStream could not be captured.");
          (await Z.initalizeAudio(e),
            Z.updateAnalyserSettings({
              minDecibels: -t,
              fftSize: i,
              smoothingTimeConstant: n,
            }),
            W(Z.filters),
            ie.forEach((e, t) => {
              Q(t, "reset");
            }),
            (b = new Float32Array(Z.preAnalyser.frequencyBinCount)),
            (q = new Float32Array(Z.postAnalyser.frequencyBinCount)),
            Z.preAnalyser.getFloatFrequencyData(b),
            Z.postAnalyser.getFloatFrequencyData(q),
            ue.postMessage({
              analyserHeight: L,
              maxFrequencyPosition: h,
              zeroFrequencyPosition: f,
              decibelRange: t,
              preFrequencyDataArray: b,
              postFrequencyDataArray: q,
              maxPeakFrequencyDataArray: A,
              preAnalyserActive: g,
              postAnalyserActive: m,
              captureMaxPeak: _,
              redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map:
                o[u],
            }));
        }),
        {
          on: {
            buttonColor(e) {
              e.style.setProperty("background-color", $);
            },
            circleBypassOpacity(e) {
              e.setAttribute("opacity", "0.5");
            },
            filterSettings() {
              Xe.style.removeProperty("display");
            },
            path(e) {
              e.removeAttribute("display");
            },
            circleHighlight(e) {
              ne[e].removeAttribute("display");
            },
            supportDonationPage() {
              (le.style.removeProperty("display"),
                le.style.setProperty("width", 0.4 * window.innerWidth + "px"),
                le.style.setProperty("left", 0.3 * window.innerWidth + "px"),
                le.style.setProperty(
                  "top",
                  0.5 * (window.innerHeight - le.offsetHeight) + "px",
                ),
                ce.style.setProperty("opacity", "20%"),
                ce.style.setProperty("pointer-events", "none"));
            },
          },
          off: {
            buttonColor(e) {
              e.style.removeProperty("background-color");
            },
            circleBypassOpacity(e) {
              e.setAttribute("opacity", "1");
            },
            filterSettings() {
              Xe.style.setProperty("display", "none");
            },
            path(e) {
              e.setAttribute("display", "none");
            },
            circleHighlight(e) {
              ne[e].setAttribute("display", "none");
            },
            supportDonationPage() {
              (le.style.setProperty("display", "none"),
                ce.style.setProperty("opacity", "100%"),
                ce.style.removeProperty("pointer-events"));
            },
          },
        });
    function fe() {
      for (let e = 0; e < ie.length; e += 1)
        Z.filtersBypassState[e] || Z.filtersAllBypassState
          ? (pe.on.circleBypassOpacity(ie[e]), pe.on.circleBypassOpacity(ne[e]))
          : Z.filtersBypassState[e] ||
            (pe.off.circleBypassOpacity(ie[e]),
            pe.off.circleBypassOpacity(ne[e]));
    }
    let P,
      S,
      G,
      F,
      x,
      D,
      w,
      T = !1;
    function N(e) {
      null == P
        ? ((P = Z.filters[e]),
          (S = e),
          (G = ie[e]),
          pe.on.circleHighlight(e),
          pe.on.buttonColor(oe[e]),
          pe.on.filterSettings(),
          E(P, e),
          window.resizeTo(786, 573))
        : e !== S
          ? (pe.off.circleHighlight(S),
            pe.off.buttonColor(oe[S]),
            (P = Z.filters[e]),
            (S = e),
            (G = ie[e]),
            pe.on.circleHighlight(e),
            pe.on.buttonColor(oe[e]),
            E(P, e))
          : T ||
            ((P = void 0),
            (S = void 0),
            (G = void 0),
            pe.off.filterSettings(),
            pe.off.buttonColor(oe[e]),
            pe.off.circleHighlight(e),
            window.resizeTo(786, 525));
    }
    function ge(e) {
      pe.off.circleHighlight(S);
      var t = Z.filters.length - 1;
      let i;
      N((i = "previous" === e ? (0 < S ? S - 1 : t) : S < t ? S + 1 : 0));
    }
    (ie.forEach((e, t) => {
      ((e.onmousedown = (e) => {
        e = e.offsetY;
        (T || ((T = !0), (F = e), (w = e)),
          N(t),
          (D = P.gain.value),
          (x = P.Q.value));
      }),
        (e.ondblclick = () => {
          var e = p.get(Z.resetFrequencyWidthPositions[t]);
          (Z.updateFilterParameters(t, u, { frequency: e, gain: 0, Q: 1 }),
            setTimeout(() => {
              (Q(t, "reset"), H(Z.filters), W(Z.filters), E(P, t));
            }, 50));
        }),
        (e.onmouseover = () => {
          pe.on.circleHighlight(t);
        }),
        (e.onmouseleave = () => {
          e !== G && pe.off.circleHighlight(t);
        }));
    }),
      (j.onmousemove = (r) => {
        var { offsetX: r, offsetY: a } = r;
        if (T && null != P) {
          var s = C.default["maxDecibelGainInput_" + c],
            o = C.default["minDecibelGainInput_" + c];
          let e,
            t,
            i =
              (["peaking", "highshelf", "lowshelf"].includes(P.type)
                ? ((l = a - F),
                  (l = -d * l),
                  (e = (e = D + l) > s ? s : e) < o && (e = o))
                : ["highpass", "lowpass", "bandpass", "notch"].includes(
                    P.type,
                  ) &&
                  ((l = 0.07 * x),
                  w && (t = a > w ? x - l : a < w ? x + l : x),
                  ["highpass", "lowpass"].includes(P.type)
                    ? t > s && (t = s)
                    : t > C.default.maxQ && (t = C.default.maxQ),
                  t < C.default.minQ && (t = C.default.minQ),
                  (x = t),
                  (w = a)),
              p.get(r)),
            n = r;
          var o = B.default[u + "_maxFrequencyInput"],
            l = y.get(o),
            s = B.default[u + "_minFrequencyInput"],
            a = y.get(s);
          (l < r && ((i = o), (n = l)),
            r < a && ((i = s), (n = a)),
            Z.updateFilterParameters(S, u, { frequency: i, gain: e, Q: t }),
            setTimeout(() => {
              (Q(S, "mousemove", { widthPosition: n }),
                H(Z.filters),
                W(Z.filters));
            }, 5),
            setTimeout(() => {
              E(P, S);
            }, 20));
        }
        ((o = r),
          (l = p.get(o).toPrecision(5)),
          (K.textContent = l + " Hz"),
          K.setAttribute("y", L - 0.005 * L + " "),
          (s = K.getBBox().width),
          (a = s / 2),
          (r = z - s / 2));
        o < a
          ? K.setAttribute("x", "" + a)
          : r < o
            ? K.setAttribute("x", "" + r)
            : K.setAttribute("x", "" + o);
      }),
      (j.onwheel = (t) => {
        if (null != P && T && "peaking" === P.type) {
          ((t = 0.04 * t.deltaY), (t = -(0.075 * x) * t));
          let e = x + t;
          ((e = e > C.default.maxQ ? C.default.maxQ : e) < C.default.minQ &&
            (e = C.default.minQ),
            (x = e),
            Z.updateFilterParameters(S, u, { Q: e }),
            setTimeout(() => {
              (H(Z.filters), W(Z.filters), E(P, S));
            }, 25));
        }
      }),
      (j.onmouseup = () => {
        T = T && !1;
      }),
      (j.onmouseleave = () => {
        ((T = T && !1), (K.textContent = null));
      }),
      (Ie.onclick = () => {
        null != P && N(S);
      }),
      (Le.onclick = () => ge("previous")),
      ($e.onclick = () => ge("next")),
      (Oe.oninput = ({ target: e }) => {
        e = e.value;
        (Z.updateFilterParameters(S, u, { type: e }),
          setTimeout(() => {
            (Q(S, "filterType"), H(Z.filters), W(Z.filters), E(P, S));
          }, 50));
      }),
      (re.onchange = ({ target: e }) => {
        const t = e.valueAsNumber;
        (Z.updateFilterParameters(S, u, { frequency: t }),
          setTimeout(() => {
            (Q(S, "filterFrequency", { frequency: t }),
              H(Z.filters),
              W(Z.filters));
          }, 50));
      }),
      (ae.onchange = ({ target: e }) => {
        e = e.valueAsNumber;
        (Z.updateFilterParameters(S, u, { Q: e }),
          setTimeout(() => {
            (Q(S, "filterQ"), H(Z.filters), W(Z.filters));
          }, 50));
      }),
      (se.onchange = ({ target: e }) => {
        e = e.valueAsNumber;
        (Z.updateFilterParameters(S, u, { gain: e }),
          setTimeout(() => {
            (Q(S, "filterGain"), H(Z.filters), W(Z.filters));
          }, 50));
      }),
      (Je.onclick = () => {
        (Z.toggleFilterBypassState(S), W(Z.filters), E(P, S), fe());
      }),
      (je.onclick = () => {
        var e = p.get(Z.resetFrequencyWidthPositions[S]);
        (Z.updateFilterParameters(S, u, { frequency: e, gain: 0, Q: 1 }),
          setTimeout(() => {
            (Q(S, "reset"), H(Z.filters), W(Z.filters), E(P, S));
          }, 50));
      }),
      oe.forEach((e, t) => {
        e.onclick = () => {
          N(t);
        };
      }),
      (Pe.onchange = () => {
        ((c = parseInt(Pe.value, 10)),
          ({ decibelGainStep: d, lineDecibelGain_heightPositionString_map: a } =
            ke[c]),
          ie.forEach((e, t) => {
            Q(t, "filterGainRange");
          }),
          I(),
          H(Z.filters),
          W(Z.filters));
      }),
      (Fe.onchange = () => {
        ((t = parseInt(Fe.value, 10)),
          ({ lineDecibel_heightPositionString_map: s } = ve[t]),
          ue.postMessage({ decibelRange: t }),
          Z.updateAnalyserSettings({ minDecibels: -t }),
          I());
      }),
      (Se.onchange = () => {
        ((i = Number.parseInt(Se.value, 10)),
          Z.updateAnalyserSettings({ fftSize: i }),
          (ot.textContent = V[i].binResolution.toFixed(4) + " Hz/Bin"),
          (lt.textContent = ye.default.sampleRate / 1e3 + " kHz"),
          (b = new Float32Array(Z.preAnalyser.frequencyBinCount)),
          (q = new Float32Array(Z.postAnalyser.frequencyBinCount)),
          ({
            redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map: o,
          } = V[i]),
          (A = new Float32Array(o[u].size).fill(-1e3)),
          ue.postMessage({
            preFrequencyDataArray: b,
            postFrequencyDataArray: q,
            maxPeakFrequencyDataArray: A,
            redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map:
              o[u],
          }));
      }),
      (Ge.onchange = () => {
        ((u = Ge.value),
          ({
            frequency_widthPosition_map: y,
            lineFrequency_widthPositionString_map: r,
            widthPosition_frequency_map: p,
          } = Te[u]),
          (f = y.get(0)),
          (h = y.get(3e4)),
          re.setAttribute("max", "" + B.default[u + "_maxFrequencyInput"]),
          re.setAttribute("min", "" + B.default[u + "_minFrequencyInput"]),
          null != P && N(S),
          Z.switchAllFiltersState(u),
          (l = Float32Array.from(p.values())),
          (A = new Float32Array(o[u].size).fill(-1e3)),
          ue.postMessage({
            zeroFrequencyPosition: f,
            maxFrequencyPosition: h,
            maxPeakFrequencyDataArray: A,
            redactedBinFrequency_widthPosition_frequencyDataArrayIndex_map:
              o[u],
          }),
          setTimeout(() => {
            ((G = void 0),
              I(),
              H(Z.filters),
              W(Z.filters),
              ie.forEach((e, t) => {
                Q(t, "frequencyScale", {
                  frequency: Z.filters[t].frequency.value,
                });
              }));
          }, 50));
      }),
      (xe.onchange = () => {
        ((n = Number.parseFloat(xe.value)),
          Z.updateAnalyserSettings({ smoothingTimeConstant: n }));
      }),
      (De.onclick = () => {
        ((g = !g),
          pe[g ? "on" : "off"].path(Y),
          pe[g ? "on" : "off"].buttonColor(De),
          ue.postMessage({ preAnalyserActive: g }));
      }),
      (we.onclick = () => {
        ((m = !m),
          pe[m ? "on" : "off"].path(U),
          pe[m ? "on" : "off"].buttonColor(we),
          ue.postMessage({ postAnalyserActive: m }));
      }),
      (Ke.onclick = () => {
        ((_ = !_),
          pe[_ ? "on" : "off"].path(qe),
          pe[_ ? "on" : "off"].buttonColor(Ke),
          pe[_ ? "off" : "on"].path(Ce),
          pe[_ ? "off" : "on"].path(J),
          He.setAttribute("display", _ || e ? "none" : ""),
          Qe.setAttribute("display", _ || e ? "none" : ""),
          Me.setAttribute("display", _ ? "none" : ""),
          X.setAttribute("display", _ ? "none" : ""),
          ue.postMessage({ captureMaxPeak: _, maxPeakFrequencyDataArray: A }));
      }),
      (Ve.onclick = () => {
        ((e = !e),
          pe[e ? "on" : "off"].buttonColor(Ve),
          He.setAttribute("display", e || _ ? "none" : ""),
          Qe.setAttribute("display", e || _ ? "none" : ""),
          ue.postMessage({ pause: e }));
      }),
      (et.onclick = () => {
        (Z.toggleAllFiltersBypassState(),
          pe[Z.filtersAllBypassState ? "on" : "off"].buttonColor(et),
          W(Z.filters),
          fe());
      }),
      (Ze.onclick = () => {
        (null != P && N(S),
          Z.filters.forEach((e, t) => {
            var i = p.get(Z.resetFrequencyWidthPositions[t]);
            Z.updateFilterParameters(t, u, {
              frequency: i,
              gain: 0,
              Q: 1,
              type: "peaking",
            });
          }),
          setTimeout(() => {
            (H(Z.filters),
              W(Z.filters),
              Z.filters.forEach((e, t) => {
                Q(t, "reset");
              }));
          }, 50));
      }),
      (tt.onclick = () => {
        pe.on.supportDonationPage();
      }),
      (it.onclick = () => {
        pe.off.supportDonationPage();
      }),
      (st.onclick = () => {
        chrome.runtime.sendMessage({ openGoogleGroupTab: !0 });
      }),
      (nt.onclick = () => {
        chrome.runtime.sendMessage({ openStripeTab: !0 });
      }),
      (rt.onclick = () => {
        chrome.runtime.sendMessage({ openLiberapayTab: !0 });
      }),
      (at.onclick = () => {
        chrome.runtime.sendMessage({ openCashappTab: !0 });
      }),
      chrome.runtime.onMessage.addListener((e, t) => {
        e.capturedTabTitle
          ? (_e.textContent = `Just-EQ (${e.capturedTabTitle})`)
          : alert(e);
      }));
  }

  // --- TAMBAHAN KODE TOMBOL STEREO ---
  window.channelMode = "LINK";
  const btnLeft = document.getElementById("ch-left");
  const btnLink = document.getElementById("ch-link");
  const btnRight = document.getElementById("ch-right");

  function updateBtnStyles() {
    btnLeft.style.backgroundColor =
      window.channelMode === "KIRI" ? "#ffe66d" : "transparent";
    btnLeft.style.color = window.channelMode === "KIRI" ? "black" : "white";

    btnLink.style.backgroundColor =
      window.channelMode === "LINK" ? "#ffe66d" : "transparent";
    btnLink.style.color = window.channelMode === "LINK" ? "black" : "white";

    btnRight.style.backgroundColor =
      window.channelMode === "KANAN" ? "#ffe66d" : "transparent";
    btnRight.style.color = window.channelMode === "KANAN" ? "black" : "white";
  }

  if (btnLeft && btnLink && btnRight) {
    btnLeft.onclick = () => {
      window.channelMode = "KIRI";
      updateBtnStyles();
    };
    btnLink.onclick = () => {
      window.channelMode = "LINK";
      updateBtnStyles();
    };
    btnRight.onclick = () => {
      window.channelMode = "KANAN";
      updateBtnStyles();
    };
    updateBtnStyles(); // Beri warna saat pertama kali buka
  }
})();
