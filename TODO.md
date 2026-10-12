# Solderless - TODO

A breadboard you build guitar/violin pedals on and play through live. Like Safety Pin: VST3 +
standalone with ASIO. Only pedal electronics in the parts drawer.

## Idea
- A breadboard on screen with power rails, a 9 V battery clip, input jack, output jack and a
  footswitch (true bypass).
- Parts drawer, pedal parts only: resistors, pots (real knobs you turn while playing), film /
  ceramic / electrolytic caps, diodes (1N4148, germanium, LED), transistors (2N3904, MPSA13,
  BC109, germanium PNP), JFETs; later op-amps (TL072) and maybe a CD4049.
- Drop parts into the holes, draw jumper wires; the circuit rebuilds and you hear it at once.
- It behaves like a real breadboard: nothing works until the circuit is complete.
  - no battery or no ground path: silence, like a dead pedal
  - a part with a floating leg does nothing (optional hint: dim dot on the loose leg)
  - electrolytic in backwards: works, slight crackle, warning; battery reversed: nothing, "you'd have cooked it"
  - input not wired through to output: silence, unless the footswitch is on bypass (clean signal)
  - short across the battery: the battery "smokes" and drains; clears when the short is removed
  - feedback / oscillators squeal and motorboat like real ones, behind a safety limiter
- Every pot on the board shows up as a knob on a pedal-face panel, automatable in the DAW.
- Tuner and MIDI learn from Safety Pin / stringtuner.
- Presets are saved boards: Fuzz14 (the 2014 breadboard fuzz) first, then Bazz Fuss, Fuzz Face, Tube Screamer
  clipping stage, Big Muff stage, LPB-1.
- Export the schematic and parts list to build it for real.

## Plan
- [ ] Solver: copy the MNA solver from Fuzz14 (matches ngspice within 0.13 %) and make it
      ~10x faster (stamp the linear parts once, only redo nonlinear parts each Newton step;
      sparse LU) - a Big Muff has 4 transistors.
- [ ] Netlist from the board: holes -> nodes (breadboard strips), wires join nodes.
- [ ] Non-converging circuits: iteration limit, fade to silence instead of glitching.
- [ ] Breadboard GUI: drag and drop, snapping, wires, rotate parts, part values.
- [ ] Plugin shell (VST3 + standalone, ASIO), pedal-face panel with the board's pots.
- [ ] Presets, schematic export.

## Credits
Farica☆Kimora © Cursed Entertainment
