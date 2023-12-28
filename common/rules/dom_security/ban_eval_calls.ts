// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  buildSafeDomFixerForFunctionCallViolation,
  SafeValueConversionKind,
import {
  ConformancePatternRule,
  ErrorCode,
  PatternKind,
} from 'google3/third_party/bazel_rules/rules_typescript/internal/tsetse/rules/conformance_pattern_rule';
import {overridePatternConfig} from '../../third_party/tsetse/util/pattern_config';
import {TRUSTED_SCRIPT} from '../../third_party/tsetse/util/trusted_types_configuration';

import {RuleConfiguration} from '../../rule_configuration';

let errMsg = 'Do not use eval, as this can lead to XSS.';

const bannedValues = [
  'GLOBAL|eval',
];

/**
 * A Rule that looks for references to the built-in eval() and window.eval()
 * methods. window.eval performs an indirect call to eval(), so a single check
 * for eval() bans both calls.
 */
export class Rule extends ConformancePatternRule {
  static readonly RULE_NAME = 'ban-eval-calls';

  constructor(configuration: RuleConfiguration = {}) {
    super(
      overridePatternConfig({
        errorCode: ErrorCode.CONFORMANCE_PATTERN,
        errorMessage: errMsg,
        kind: PatternKind.BANNED_NAME,
        values: bannedValues,
        name: Rule.RULE_NAME,
        allowedTrustedType: TRUSTED_SCRIPT,
        ...configuration,
      }),
    );
  }
}
